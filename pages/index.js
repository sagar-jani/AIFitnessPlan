import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

const Home = () => {
  return (
    <section className='bg-black min-h-screen'>
      <Head>
        <title>Fitness AI</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='bg-black flex items-center justify-center flex-col '>
        <div className='absolute top-0 right-0'>
          <button className='px-4 py-2 mt-3 mr-3 font-medium text-white bg-2CB49B hover:bg-white hover:text-2CB49B bg-til rounded-2xl'>
            Join Waitlist
          </button>
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

        <div className='grid grid-cols-2 grid-rows-2 gap-10 mt-10'>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>
          <Image
              src='/images/inputstats.png'
              alt='Picture of the author'
              width={350}
              height={350}
            />
          </div>

          <div className='col-span-1 row-span-1 flex items-center justify-center'>
          <Image
              src='/images/mealplan.png'
              alt='Picture of the author'
              width={450}
              height={400}
            />
          </div>

          <div className='col-span-1 row-span-1 flex items-center justify-center'>

          </div>
          <div className='col-span-1 row-span-1 flex items-center justify-center'>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Home
