
import { buffer } from 'micro';
import getStripe from '../../utils/get-stripejs'
import prisma from "../../lib/prismadb";
import Stripe from 'stripe';
import Cors from "micro-cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});


export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || "";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req, res) => {
  console.log('****** webhook invoked ****** ');
  console.log('****** req.method ****** ', req.method);


  console.log('stripe', stripe)

  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
      console.log('event', event);
      console.log('event.type', event.type);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      if (err instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "checkout.session.completed"
    ) {
      const paymentIntent = event.data.object
      console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`);

      const session = event.data.object;
      console.log('sessionp', session)
      // const userEmail = session.customer_email;


      const userEmail = paymentIntent.customer_details.email;
      console.log('userEmail', userEmail);
      let creditAmount = 0;

      // Update user's isPro status in your database
      await prisma.user.update({
        where: { email: userEmail },
        data: { isPro: true },
      });

      await prisma.purchase.create({
        data: {
          creditAmount: creditAmount,
          user: {
            connect: {
              email: userEmail,
            },
          },
        },
      });
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event. Upgraded.
    res.json({ received: true });

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};


export default cors(webhookHandler)