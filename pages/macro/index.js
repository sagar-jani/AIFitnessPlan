import Head from "next/head"
import React, { useEffect, useState } from "react"
import MacroRecipe from "../../components/MacroRecipe"
import { Rings } from "react-loader-spinner";
import { useSession, signIn, getSession } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import prisma from '../../lib/prismadb'
import Link from "next/link";

const Macro = ({ user }) => {
  const { data: session, status } = useSession();
  const [disableBtn, setDisableBtn] = useState(false)
  console.log('user', user)
  useEffect(() => {
    if (user.generationCount > 7) {
      setDisableBtn(true)
    }
  }, [user])
  return (
    // <div className="flex w-full px-20  flex-col py-2 min-h-screen">
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Macro Planner - Generate Meal !</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <Header photo={session?.user?.image || undefined} />
      <div className="flex w-full">
        {status === 'authenticated' && (
          <div className="flex-none  py-5">
            <Sidebar count={user?.generationCount} />
          </div>
        )}

        <main className="flex flex-1 w-full flex-col  text-center px-4 mt-4 sm:mb-0 mb-8">
          {status === "loading" ? (
            <div className="max-w-[670px] h-[250px] flex justify-center items-center">
              <Rings
                height="100"
                width="100"
                color="black"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            </div>
          ) : status === "authenticated" ? (
            <>
              {user?.generationCount >= 7 && (
                <div className="flex flex-col mx-auto max-w-5xl py-5 px-10  text-xl justify-center text-center font-semibold text-brown  items-center   bg-yellow-50 ">

                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                      aria-hidden="true" className="px-2 py-5 space-x-2 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z">
                      </path>
                    </svg>

                    Your Free Plan is over!</span>
                  <span>
                    You have used 100% of your free plan. <Link href='/pricing' className="underline"> Upgrade to the Pro Plan to generate unlimited plans! </Link ></span>
                </div>
              )}
              <MacroRecipe disabled={disableBtn} />
            </>
          ) : (
            <div className="flex py-20  flex-col justify-center items-center space-y-6 ">
              <div className=" text-white text-xl md:text-2xl">
                Sign in below with Google to create a free account and generate workout plan.
              </div>
              <button
                onClick={() => signIn("google")}
                className={`bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2 `}
              >
                <Image
                  src="/images/google.png"
                  width={20}
                  height={20}
                  alt="google's logo"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </main>

      </div>
    </div >

  )
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


export default Macro