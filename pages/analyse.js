import { getSession, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import React, { useEffect } from "react";
import ResizablePanel from '../components/ResizablePanel'
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import LoadingDots from "../components/LoadingDots";
import { CompareSlider } from "../components/CompareSlider";
import { faDedent } from "@fortawesome/free-solid-svg-icons";
import Error from 'next/error'
import Header from "../components/Header";
import Script from "next/script";
import SideBar from "../components/Sidebar";
import prisma from '../lib/prismadb'
import Sidebar from "../components/Sidebar";
import Link from "next/link";


const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const AnalyseTechnique = ({ user }) => {
  const { data: session, status } = useSession();

  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [proPlan, setProPlan] = useState(false)
  const [disable, setDisable] = useState(false)


  useEffect(() => {
    if (user.generationCount > 7) {
      setDisable(true)
    }
  }, [user])

  const options = {
    maxFileCount: 1,
    mimeTypes: ["video/quicktime", "video/mp4", "image/gif"],
    editor: { images: { crop: false } },
    styles: {
      colors: {
        primary: "#2563EB", // Primary buttons & links
        error: "#d23f4d", // Error messages
        shade100: "#fff", // Standard text
        shade200: "#fffe", // Secondary button text
        shade300: "#fffd", // Secondary button text (hover)
        shade400: "#fffc", // Welcome text
        shade500: "#fff9", // Modal close button
        shade600: "#fff7", // Border
        shade700: "#fff2", // Progress indicator background
        shade800: "#fff1", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
  };

  async function analyseWorkout(fileUrl) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const response = await fetch("/api/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });
    console.log('response', response)
    if (!response.ok) {
      // throw new Error(response.statusText);
      setLoading(false);
      const json = await response.json()
      console.log('json', json)
      if (json.error === 'NO_PRO_PLAN') {
        setProPlan(false)
      }
    } else {
      setProPlan(true)
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
        setFeedback((prev) => prev + chunkValue);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1300);
    }


  }

  const displayText = (feedback) => {

    return (feedback.split('\n').map((line, i) => (
      <p key={i} className="text-white">{line}</p>
    ))
    )
  }

  const ApiResponse = (feedback) => {
    const sections = feedback.split('\n\n');
    console.log('sections', sections)
    console.log('feedback', feedback)

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="font-semibold text-lg mb-2">{sections[0]}</h2>

        <p className="text-gray-800 mb-2">{sections[1]}</p>

        <ol className="list-decimal ml-6 text-gray-800">
          {sections[2].split('\n').filter(item => item.trim().length > 0).map((item, i) => (
            <li key={i} className="mb-1">{item}</li>
          ))}
        </ol>
      </div>
    );
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          analyseWorkout(file[0].fileUrl);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );


  return (
    // <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
    <div className="flex w-full px-20  flex-col py-2 min-h-screen">

      <Head>
        <title>Analyse Training Technique</title>
      </Head>
      <Script src="https://js.stripe.com/v3/pricing-table.js" />
      <Header photo={session?.user?.image || undefined} />
      <div className="flex w-full">
        {status === 'authenticated' && (
          <div className="flex-none  py-5">
            <Sidebar count={user?.generationCount} />
          </div>
        )}
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">

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
          </>

          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
            Analyse your <span className="text-blue-600">Excercise Form</span>
          </h1>

          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                <div className="mt-4 w-full max-w-sm">
                  <div className="flex mt-6 w-96 items-center space-x-3 ">
                    <Image
                      src="/images/number-1-white.svg"
                      width={30}
                      height={30}
                      alt="1 icon"
                    />
                    <p className="text-left font-medium text-white">
                      Upload a vidoe of your workout.
                    </p>
                  </div>
                </div>

                {!feedback && !disable && <UploadDropZone />}

                {loading && (
                  <button
                    disabled
                    className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                  >
                    <span className="pt-4">
                      <LoadingDots color="white" style="large" />
                    </span>
                  </button>
                )}

                {/* {feedback && (
                <CompareSlider
                  original={originalPhoto}
                  restored={feedback}
                />
              )} */}

                {feedback && <div className="text-white">{ApiResponse(feedback)}</div>}
                {/* {!proPlan && (
                  <section className="h-screen">
                    <div className="bg-gradient">
                      <stripe-pricing-table pricing-table-id="prctbl_1MnKxXH9GTHwGMksHuVBo5Le"
                        publishable-key="pk_test_51MmbbuH9GTHwGMks2J2KLJLAO5dTLiyzUY5au9xS82CMTdJxoeutIaQU8Bher3v9jc1HCGXu6B11JSuRGAz2gLxJ009vGyjvWH" customer-email={session?.user?.email}>
                      </stripe-pricing-table>
                    </div>
                  </section>
                )} */}

              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </main>
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

export default AnalyseTechnique;