import React, { useState } from 'react'
import * as config from '../config'
import getStripe from '../utils/get-stripejs'
import { fetchPostJSON } from '../utils/api-helpers'

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  })

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation,
    })

    if (response.statusCode === 500) {
      console.error(response.message);
      return
    }
    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  }

  return (

    <section>
      <div className=''>
        <div className="description">
          <h3>Fitness Plan</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button className='bg-til justify-center' type="submit" id="checkout-button">Checkout</button>
      </form>
    </section>
  )
}

export default CheckoutForm