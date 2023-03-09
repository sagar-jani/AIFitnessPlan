import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";

const Home = () => {
  return (

    <section className=' min-h-screen'>
      <Head>
        <title>Fitness AI Homepage</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className=' flex items-center justify-center flex-col '>
        <div className='absolute top-0 right-0'>
        </div>
        <h1 className='text-white text-5xl font-bold mt-20'>
          AI POWERED FITNESS
        </h1>
        <p className='text-white text-lg font-outline'>
          Personalised nutrition plan to achieve your goal
        </p>
        <div className='grid grid-cols-2 grid-rows-2 gap-1 mt-20'>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <Image
              src='/images/nutrition.png'
              alt='Picture of the author'
              width={80}
              height={80}
            />
            <p className='text-center text-white'>Sustainable Nutrition</p>
          </div>

          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <Image
              src='/images/journal.png'
              alt='Picture of the author'
              width={80}
              height={80}
            />
            <p className='text-center text-white'>A Practical Program</p>
          </div>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <Image
              src='/images/graph.png'
              alt='Picture of the author'
              width={80}
              height={80}
            />
            <p className='text-center text-white'>Guaranteed Results</p>
          </div>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <Image
              src='/images/squats.png'
              alt='Picture of the author'
              width={80}
              height={80}
            />
            <p className='text-center text-white'>Exercise You Want to Do </p>
          </div>
        </div>
        <h1 className='text-white text-5xl font-bold mt-20 mb-10'>HOW IT WORKS</h1>

        <div className='grid grid-cols-2 d-flex justify-content-center align-items-center gap-10'>
          <div className='mx-auto'>
            <Image height={500} width={500} className="rounded-t-lg pt-5 pl-5" src="/images/bmr-macro-1.png" alt="" />
          </div>
          <div className='mx-auto'>
            <Image height={500} width={500} className="rounded-t-lg pt-5 pl-5" src="/images/macro-nutrients-1.png" alt="" />
          </div>

        </div>

        <h1 className='text-white text-5xl font-bold mt-20'>Nutrition &amp; Workout Plan</h1>
        <div className='grid grid-cols-2 d-flex justify-content-center align-items-center gap-10'>
          <div className='mx-auto'>
            <Image height={500} width={500} className="rounded-t-lg pt-5 pl-5" src="/images/nutrition-plan-1.png" alt="" />
          </div>
          <div className='mx-auto'>
            <Image height={500} width={500} className="rounded-t-lg pt-5 pl-5" src="/images/workout-plan-1.png" alt="" />
          </div>
        </div>

        <Link href="/plan" className="inline-flex items-center px-10 mt-20 py-5 text-2xl font-medium text-center justify-center text-white bg-primary rounded-3xl hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
          Get started
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link >
      </div >
    </section >

  )
}

export default Home
