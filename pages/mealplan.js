
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Header';
import LoadingDots from '../components/LoadingDots';
import MealFormat from '../components/MealFormat';
import Sidebar from '../components/Sidebar';
import prisma from '../lib/prismadb'

const MealPlanner = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(1);
  const [meals, setMeals] = useState("");
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/nutrition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: e.target.goal.value,
          dietType: e.target.dietType.value,
          days: e.target.days.value,
        }),
      })
      setLoading(false);
      if (!response.ok) {
        console.log("error", response.statusText);
        return;
      }

      const data = await response.json()
      console.log('meals', data.meal)
      setMeals(data.meal)
      // if (!response.ok) {
      //   throw new Error(response.statusText);
      // }

      // // This data is a ReadableStream
      // const data = response.body;
      // if (!data) {
      //   return;
      // }

      // const reader = data.getReader();
      // const decoder = new TextDecoder();
      // let done = false;

      // while (!done) {
      //   const { value, done: doneReading } = await reader.read();
      //   done = doneReading;
      //   const chunkValue = decoder.decode(value);
      //   setMeals((prev) => prev + chunkValue);
      // }
      // setLoading(false);

    } catch (error) {
      // setError("Oops, something went wrong on our website! But don't worry, our team of monkeys are fixing it as we speak. In the meantime, go grab a drink and relax. We'll be back to normal soon.")
      console.log('An error occured while generating nutrition plan', error)
    } finally {
      setLoading(false)
    }

  }

  const handleSlider = (event) => {
    setDays(event.target.value);
  };

  return (
    <div className="flex w-full px-20  flex-col py-2 min-h-screen">
      <Head>
        <title>Fitness, Diet, and Exercise on AI</title>
      </Head>
      <Header photo={session?.user?.image || undefined} />
      <div className="flex w-full">
        {status === 'authenticated' && (
          <div className="flex-none  py-5">
            <Sidebar count={user?.generationCount} />
          </div>
        )}
        <section className='w-full'>
          <div className="text-center mb-5 mt-10">
            <p className="text-white text-5xl font-bold">Generate Meal Plan</p>
          </div>
          <form className='mx-auto mt-20 w-1/2 text-xl' onSubmit={handleSubmit}>
            <div className='mb-10'>
              <label className='block text-white  font-bold mb-5' htmlFor='goal'>
                What is your Goal ?
              </label>
              <select
                className='block appearance-none w-full  border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='goal'
                name='goal'
              >
                <option value='Lose Fat'>Lose Fat</option>
                <option value='Gain Muscles'>Gain Muscles</option>
                <option value='Eat Healthy'>Eat Healthy</option>
              </select>
            </div>

            <div className='mb-10'>
              <label className='block text-white font-bold mb-5' htmlFor='dietType'>
                Choose your Dietary Requirment
              </label>
              <select
                className='block appearance-none w-full  border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='dietType'
                name='dietType'
              >
                <option value='No Dietary Restrictions'>No Dietary Restrictions</option>
                <option value='Pescatarian'>Pescatarian</option>
                <option value='Ovo-vegetarian'>Vegetarian</option>
                <option value='Vegetarian'>Vegetarian</option>
                <option value='Vegan'>Vegan</option>
                <option value='Dairy-Free'>Dairy-Free</option>
                <option value='Gluten-Free'>Gluten-Free</option>
              </select>
            </div>

            <div className='mb-4'>
              <label
                className='block text-white font-bold mb-5'
                htmlFor='days'>
                Duration of Meal Plan ?
              </label>
              <div className="items-center justify-center">
                <input
                  name="days"
                  id="days"
                  type="range"
                  min="1"
                  max="7"
                  value={days}
                  className="mb-5 w-full h-1 bg-gray-400 appearance-none rounded-full cursor-pointer outline-none focus:shadow-outline"
                  onChange={handleSlider}
                />
                <span className='flex mt-5 mx-auto text-xl font-bold text-center justify-center'>
                  <label className="text-white ">{days} Days</label>
                </span>

              </div>
            </div>
            {!loading && (
              <button
                type='submit'
                className="block bg-primary rounded-xl text-white text-xl  mx-auto font-medium py-6 px-8 mt-8 hover:bg-primary text-center ">
                Generate Your Meal Plan &rarr;
              </button>
            )}

            {loading && (
              <button
                className='block bg-primary text-2xl text-white font-bold mx-auto py-5 px-28 rounded-xl text-center'
                type='submit'
              >
                <LoadingDots color="white" style="large" />
                {/* <p>Please wait, this would take ~15 seconds.</p> */}
              </button>
            )}
          </form>
          {meals.length > 0 && <MealFormat mealPlan={meals} />}
          {/* {meals && (<div className='text-white'> {meals} </div>)} */}
        </section>
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


export default MealPlanner;