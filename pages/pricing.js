import Head from "next/head"
import React from "react"
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

const Pricing = () => {
  const { data: session, status } = useSession();


  //TODO: make sure login is on landing page first
  return (
    <section className="h-screen">
      <div className="bg-gradient">
        <stripe-pricing-table pricing-table-id="prctbl_1MnKxXH9GTHwGMksHuVBo5Le"
          publishable-key="pk_test_51MmbbuH9GTHwGMks2J2KLJLAO5dTLiyzUY5au9xS82CMTdJxoeutIaQU8Bher3v9jc1HCGXu6B11JSuRGAz2gLxJ009vGyjvWH" customer-email={session?.user?.email}>
        </stripe-pricing-table>
      </div>
    </section>
  );
}

export default Pricing