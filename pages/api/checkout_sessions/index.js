

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {

        mode: 'payment',
        line_items: [
          {
            name: 'Fitness Plan',
            amount: 10.0 * 100,
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        // success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${req.headers.origin}/donate-with-checkout`,
      }
      const checkoutSession = await stripe.checkout.sessions.create(params)

      console.log(checkoutSession)
      res.status(200).json(checkoutSession)
      console.log('checkoutSession.url', checkoutSession.url)

    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}