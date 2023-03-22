import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import ResizablePanel from '../components/ResizablePanel'
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import LoadingDots from "../components/LoadingDots";
import { CompareSlider } from "../components/CompareSlider";
import { faDedent } from "@fortawesome/free-solid-svg-icons";
import Error from 'next/error'
import Header from "../components/Header";


const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const AnalyseTechnique = () => {
  const { data: session, status } = useSession();

  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalPhoto, setOriginalPhoto] = useState(null);

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
      return <Error statusCode={response.status} />
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
      setFeedback((prev) => prev + chunkValue);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1300);
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
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header photo={session?.user?.image || undefined} />
      <Head>
        <title>Analyse Training Technique</title>
      </Head>
      {/* <Header photo={session?.user?.image || undefined} /> */}
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">

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

              {!feedback && <UploadDropZone />}

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

            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
    </div>
  );
}

export default AnalyseTechnique;