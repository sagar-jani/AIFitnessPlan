import Head from "next/head"
import React from "react"

const Pricing = () => {
  return (

    <section className="h-screen">
      <stripe-pricing-table pricing-table-id="prctbl_1MmpOXH9GTHwGMkslbCqZbws"
        publishable-key="pk_live_51MmbbuH9GTHwGMksN28KcFRKPf5nGf1WdYQZ29ZQj2MhmsNBBowEDN9NK1B7DCVCXGUO0tpUHt7I3xvfrAT0z5EC00TN3wTmWV">
      </stripe-pricing-table>
    </section>
  );
}

export default Pricing