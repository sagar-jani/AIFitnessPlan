import Image from "next/image";
import React from "react";
import MyPassion from "../components/Passion";

const About = () => {
  return (
    <div className="bg-gradient text-white">
      <p className="mt-8 mb-4 text-5xl font-extrabold  sm:text-7xl text-center">G&apos;day! <span role="img" aria-label="Waving-hand emoji">👋
      </span>
      </p>
      <p className="mb-8 text-5xl font-extrabold  sm:text-7xl text-center"> I&apos;m
        <a className="underline text-indigo-600 hover:text-indigo-500" href="https://twitter.com/sagarjani" target="_blank" rel="noopener noreferrer"> Sagar
        </a>
      </p>
      <div className="px-4 mb-8 space-y-12 sm:grid sm:gap-y-12 sm:space-y-0 sm:grid-cols-3 sm:gap-x-8">
        <div className="aspect-h-2">
          <Image
            src='/images/nutrition.png'
            alt='Picture of the author'
            width={800}
            height={800}
          />
        </div>
        <div className="aspect-h-2">
          <Image
            src='/images/nutrition.png'
            alt='Picture of the author'
            width={800}
            height={800}
          />
        </div>
        <div className="aspect-h-2">
          <Image
            src='/images/nutrition.png'
            alt='Picture of the author'
            width={800}
            height={800}
          />
        </div>
      </div>

      <div className="max-w-prose mx-auto prose prose-indigo">
        <p className="text-5xl font-bold text-center">
          I&apos;m the
          <span className="underline decoration-green-500 pl-1">
            Founder, Fitness Coach, Dad & Full-time Engineer.
          </span>
        </p>
        {/* <p className="text-xl font-medium text-center mt-10">
          I am a dedicated individual with a passion for fitness and a full-time career in IT. Despite the demands of my job and family, I have managed to maintain a healthy and active lifestyle through consistent exercise and careful time management. I believe that with the right mindset and dedication, anyone can achieve their fitness goals while also balancing other important aspects of their life. I am excited to share my experiences and tips for success with others who are also looking to improve their health and well-being.
        </p> */}
        <MyPassion />
      </div>

    </div>
  )
}

export default About;