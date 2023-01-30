import Image from "next/image";
import React from "react";
import ClientTransformations from "../components/ClientTransformation";
import FitnessOfferings from "../components/FitnessOfferings";
import MyPassion from "../components/Passion";

const About = () => {
  return (
    <div className="bg-gradient text-white">
      <p className="mb-4 text-5xl font-extrabold  sm:text-7xl text-center">G&apos;day! <span role="img" aria-label="Waving-hand emoji">👋
      </span>
      </p>
      <p className="mb-8 text-5xl font-extrabold  sm:text-7xl text-center"> I&apos;m
        <a className="underline text-indigo-600 hover:text-indigo-500" href="https://twitter.com/sagarjani" target="_blank" rel="noopener noreferrer"> Sagar
        </a>
      </p>

      {/* <div className="px-4 mb-8 space-y-12 sm:grid sm:gap-y-12 sm:space-y-0 sm:grid-cols-3 sm:gap-x-8"> */}
      {/* <div>
          <Image
            src='/images/fitness-coach.jpg'
            alt='Picture of the author'
            width={800}
            height={800}
          />
        </div> */}
      {/* <div className="rounded-full justify-center text-center self-center ">
       */}




      <div className="max-w-prose mx-auto prose prose-indigo text-center">
        <div className=" mb-8   sm:space-y-0 sm:grid-cols-3 ">
          <Image
            src='/images/fitness-coach.jpg'
            alt='Fitness Coach'
            width={580}
            height={580}
            className="object-cover object-center rounded-full"
          // className="w-48 h-48"
          />
        </div>
        <p className="text-5xl font-bold text-center">
          I&apos;m the
          <span className="underline decoration-green-500 pl-1">
            Founder, Fitness Coach, Dad & Full-time Engineer.
          </span>
        </p>
        {/* <p className="text-xl font-medium text-center mt-10">
          I am a dedicated individual with a passion for fitness and a full-time career in IT. Despite the demands of my job and family, I have managed to maintain a healthy and active lifestyle through consistent exercise and careful time management. I believe that with the right mindset and dedication, anyone can achieve their fitness goals while also balancing other important aspects of their life. I am excited to share my experiences and tips for success with others who are also looking to improve their health and well-being.
        </p> */}
        {/* <MyPassion /> */}
        <FitnessOfferings />
      </div>
      {/* </div> */}

    </div>
  )
}

export default About;