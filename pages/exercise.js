import { signIn, useSession } from "next-auth/react"
import Head from "next/head"
import React from "react"
import { useState } from "react"
import { Rings } from "react-loader-spinner"
import LoadingDots from '../components/LoadingDots'
import MacroRecipe from "../components/MacroRecipe"
import WorkoutPlan from "../components/WorkoutPlan"
import Image from "next/image"
const ExercisePlanner = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Exercise Planner</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <section className='flex flex-col justify-center items-center content-center py-20'>
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

          <div className="flex py-20  flex-col justify-center items-center space-y-6">
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

      </section>
    </>

  )
}

export default ExercisePlanner