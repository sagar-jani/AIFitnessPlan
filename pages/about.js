import Image from "next/image";
import React from "react";
import ClientTransformations from "../components/ClientTransformation";
import FitnessOfferings from "../components/FitnessOfferings";
import MyPassion from "../components/Passion";
import Pricing from "../components/pricing";

const About = () => {
  return (
    <div className="bg-gradient text-white">
      <p className="mb-4 text-5xl font-extrabold  sm:text-7xl text-center">G&apos;day! <span role="img" aria-label="Waving-hand emoji">👋
      </span>
      </p>
      <p className="mb-8 text-5xl font-extrabold  sm:text-7xl text-center"> I&apos;m
        <a className="underline text-primary hover:text-primary" href="https://twitter.com/sagarjani" target="_blank" rel="noopener noreferrer"> Sagar
        </a>
      </p>

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

      </div>
      {/* </div> */}
      <FitnessOfferings />

    </div>
  )
}

export default About;