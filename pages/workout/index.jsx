
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import LoadingDots from '../../components/LoadingDots'
import Header from '../../components/Header'
import { getSession, signIn, useSession } from 'next-auth/react';
import Sidebar from "../../components/Sidebar";
import prisma from '../../lib/prismadb'
import Link from "next/link";

const Workout = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState("");

  const { data: session, status } = useSession();
  const [disableBtn, setDisableBtn] = useState(false)
  console.log('user', user)
  useEffect(() => {
    if (user.generationCount > 7) {
      setDisableBtn(true)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  const DisplayText = ({ text }) => {
    const days = text.trim().split("Day").slice(1);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map((day, index) => (
          <div
            key={index}
            className="bg-gray-800 text-gray-400  p-6 rounded-xl shadow"
          >
            <h3 className="text-lg md:text-2xl text-blue-700 font-bold mb-4">Day {index + 1}</h3>
            <div className="text-base leading-relaxed">
              {day
                .split("\n")
                .filter((line) => line)
                .map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-2">
                    {line}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    // <div className="flex max-w-6xl mx-auto flex-col py-2 min-h-screen">
    <div className="flex w-full px-20  flex-col py-2 min-h-screen">
      <Head>
        <title>Workout AI</title>
      </Head>
      <Header photo={session?.user?.image || undefined} />
      <div className="flex w-full">
        {status === 'authenticated' && (
          <div className="flex-none  py-5">
            <Sidebar count={user?.generationCount} />
          </div>
        )}
        <section className="flex flex-1 w-full flex-col  text-center px-4 mt-4 sm:mb-0 mb-8">


          {user?.generationCount >= 7 && (
            <div className="flex flex-col mx-auto max-w-5xl py-5 px-10 mb-16  text-xl justify-center text-center font-semibold text-brown  items-center   bg-yellow-50 ">

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

          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-10">
            Generate your <span className="text-blue-600">Exercise Plan</span>
          </h1>

          {!loading && (

            <button
              className={`block text-2xl text-white font-bold mx-auto py-5 px-10 rounded-xl text-center ${disableBtn ? "bg-blue-200 hover:bg-blue-200" : "bg-primary hover:bg-primary"}`}
              type='submit'
              disabled={disableBtn}
              onClick={(e) => handleSubmit(e)}
            >
              Generate workout 🏋️‍♂️
            </button>
          )}
          {loading && (
            // <button
            //   className="bg-black rounded-xl text-white font-medium px-5 py-5 sm:mt-10 mt-8 hover:bg-black/80 my-10"
            //   disabled
            // >
            <button
              className='block bg-primary text-2xl text-white font-bold mx-auto py-5 px-28 rounded-xl text-center'
              type='submit'
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}

          {generatedBios && (
            <>
              <DisplayText text={generatedBios} />
            </>)}
        </section>
      </div>
    </div>
  )
};

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

export default Workout;
