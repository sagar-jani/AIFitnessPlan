
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useRef, useState } from "react";
import LoadingDots from '../../components/LoadingDots'

const Workout = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState("");


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
    <section className=" justify-center text-center text-white px-10">
      <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-10">
        Generate your <span className="text-blue-600">Exercise Plan</span>
      </h1>

      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-5 py-5 sm:mt-10 mt-8 hover:bg-black/80 my-10"
          onClick={(e) => handleSubmit(e)}
        >
          Generate workout 🏋️‍♂️
        </button>
      )}
      {loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-5 py-5 sm:mt-10 mt-8 hover:bg-black/80 my-10"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )}

      {generatedBios && (
        <>
          <DisplayText text={generatedBios} />
        </>)}


    </section>
  )
};

export default Workout;
