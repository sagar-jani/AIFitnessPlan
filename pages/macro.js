import Head from "next/head"
import React from "react"
import MacroRecipe from "../components/MacroRecipe"
import { Rings } from "react-loader-spinner";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Header from "../components/Header";

const Macro = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex max-w-6xl mx-auto flex-col py-2 min-h-screen">

      <Header photo={session?.user?.image || undefined} />
      <Head>
        <title>Macro Planner - Generate Meal !</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <div className='flex flex-col justify-center items-center content-center py-20'>
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
          <MacroRecipe />
        ) : (

          <div className="flex py-20  flex-col justify-center items-center space-y-6 ">
            <div className=" text-white text-xl md:text-2xl">
              Sign in below with Google to create a free account and generate workout plan.
            </div>
            <button
              onClick={() => signIn("google")}
              className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
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
      </div>
    </div>

  )
}

export default Macro