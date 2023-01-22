import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";

const Home = () => {
  return (
    <section className=' min-h-screen'>
      <Head>
        <title>Fitness AI</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='bg-black flex items-center justify-center flex-col '>
        <div className='absolute top-0 right-0'>
          {/* <button className='px-4 py-2 mt-3 mr-3 font-medium text-white bg-2CB49B hover:bg-white hover:text-2CB49B bg-til rounded-2xl'>
            Join Waitlist
          </button> */}
        </div>
        <div className='absolute top-0 left-0 pl-4 pt-2 font-medium text-white'>
          Fitness AI
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
        <h1 className='text-white text-5xl font-bold mt-20'>HOW IT WORKS</h1>
        <p className='text-white text-lg font-outline'>
          Get your personalised plan in less than 60 seconds
        </p>

        <div className='grid grid-cols-2 grid-rows-1 gap-10 mt-10 mb-10'>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <Image className="rounded-t-lg pt-5 pl-5" src="/images/inputstats.png" alt="" width={350} height={400} />
              <div className="p-5">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-til text-center rounded-xl">STEP 1</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Start by measuring your total daily calorie intake. </p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          </div>

          <div className='col-span-1 row-span-1 flex items-center justify-center'>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <Image className="rounded-t-lg pt-14" src="/images/mealplan.png" alt="" width={550} height={500} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-til text-center rounded-xl">STEP 2</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Get your nutrition plan with each meal planned with balanced diet of protein, carbs & fats.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <Link href="/plan" className="inline-flex items-center px-10 py-5 text-2xl font-medium text-center justify-center text-white bg-til rounded-3xl hover:bg-til focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Get started
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Link>

        <div className='fixed bottom-0 right-0 mr-4 mb-5 font-bold text-xl '>
          <a
            target="_blank"
            href='https://twitter.com/sagarjani'
            className='right-0 bottom-0 mb-4 mr-4 font-mono text-white bg-black rounded-xl p-4 ' rel="noreferrer"
          >
            Made By @SagarJani
          </a>
        </div>

        <footer className='bg-black text-white font-bold text-xl flex justify-center p-4 mt-10 mb-5'>
          <p>© 2023 AI Fitness Plan. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}

export default Home
