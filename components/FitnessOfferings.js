import React from "react";
import Image from 'next/image'

const FitnessOfferings = () => {
  return (


    // <div className="flex flex-col items-center mt-10">
    <>

      {/* <p className="mt-4 text-center text-xl">
        I bring a unique perspective to health and wellness as a fitness enthusiast and full-time software consultant.
        My strengths in this area include:
      </p> */}
      <div className="grid grid-rows-1 grid-flow-col gap-20 mt-20 ml-20 mx-auto">
        <div className=" box-border w-full border-4 p-5 justify-items-center mx-auto" style={{ display: "flex", alignItems: "center" }}>
          <div className="mx-auto">
            <Image
              src='/images/healthy-eating.png'
              alt='Picture of client 2'
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <div className="text-3xl font-bold mx-auto my-auto text-primary">
            Customised Nutrition
          </div>
        </div>

        <div className="box-border border-4 p-5" style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Image
              src='/images/stretch-pana.png'
              alt='Picture of client 2'
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <div className="text-3xl font-bold mx-auto text-primary">
            Fat Loss & Muscle Gain
          </div>
        </div>


        <div className="box-border  w-300  border-4 p-5" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src='/images/injury-prevention.png'
            alt='Picture of client 2'
            width={150}
            height={150}
            className="mx-auto"
          />
          <div className="text-3xl font-bold text-primary">
            Injury Management & Prevention
          </div>
        </div>
        <div>

        </div>

      </div>
      {/* <ul className="mt-4 text-center text-xl list-disc">
        <li>Expertise in Fat Loss and Muscle Building</li>
        <li>In-depth knowledge of Injury Management</li>
        <li>Proven track record of balancing fitness with Family and Professional Responsibilities</li>
        <li>Strong Time Management Skills</li>
        <li>Passionate about Helping Others Achieve their Health and Wellness Goals</li>
      </ul>
      <p className="mt-4 text-center text-xl mb-10">
        As a full-time software consultant, I bring a well-rounded perspective on wellness and balance to my passion for fitness.
        I am dedicated to empowering others to reach their health and wellness goals.
      </p> */}
      {/* </div> */}
    </>
  )
}

export default FitnessOfferings;
