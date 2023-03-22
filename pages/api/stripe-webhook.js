
import { buffer } from 'micro';
import getStripe from '../../utils/get-stripejs'
import prisma from "../../lib/prismadb";
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  console.log('****** webhook invoked ****** ');
  console.log('****** req.method ****** ', req.method);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
  console.log('stripe', stripe)

  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('event', event);
      console.log('event.type', event.type);
    } catch (err) {
      console.log('exception')
      res.status(400).send(`Webhook error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('sessionp', session)
      const userEmail = session.customer_email;
      console.log('userEmail', userEmail);

      // Update user's isPro status in your database
      await prisma.user.update({
        where: { email: userEmail },
        data: { isPro: true },
      });
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};


export default webhookHandler