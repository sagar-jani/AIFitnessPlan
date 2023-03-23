import Head from "next/head"
import React from "react"
import { useSession, signIn, getSession } from "next-auth/react";
import Image from "next/image";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import prisma from '../lib/prismadb'
import Link from "next/link";

const Pricing = ({ user }) => {
  const { data: session, status } = useSession();


  //TODO: make sure login is on landing page first
  return (
    <div className="flex w-full px-20  flex-col py-2 min-h-screen">
      <Head>
        <title>Pricing - AI Fitness Planner</title>
      </Head>
      <Header photo={session?.user?.image || undefined} />
      <div className="flex w-full">
        {status === 'authenticated' && (
          <div className="flex-none  py-5">
            <Sidebar />
          </div>
        )}
        {user?.generationCount >= 7 && (
          <div className="flex flex-col text-white text-center  justify-center"> You have used 100% of your Free Plan.
            <Link href='/pricing'>Upgrade to the Pro Plan to generate unlimited plans! </Link >
          </div>
        )}
        <section className="flex w-full flex-col py-10 text-center px-4 mt-4 sm:mb-0 mb-8">
          {/* <div className="bg-gradient"> */}
          <stripe-pricing-table pricing-table-id="prctbl_1MnKxXH9GTHwGMksHuVBo5Le"
            publishable-key="pk_test_51MmbbuH9GTHwGMks2J2KLJLAO5dTLiyzUY5au9xS82CMTdJxoeutIaQU8Bher3v9jc1HCGXu6B11JSuRGAz2gLxJ009vGyjvWH" customer-email={session?.user?.email}>
          </stripe-pricing-table>
          {/* </div> */}
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log('email', session?.user?.email)
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  })
  console.log('generationCount', user?.generationCount)
  return {
    props: {
      user,
    },
  }
}

export default Pricing