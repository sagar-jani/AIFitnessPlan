import React, { useState } from 'react'
import Head from 'next/head'
import MealTable from '../MealTable'

const Plan = () => {
  const [tdee, setTdee] = useState(0)
  const [error, setError] = useState(null)
  const [meals, setMeals] = useState([])

  const formatResponse = (response) => {
    const meals = []

    // Split the response into lines
    const lines = response.split('\n')

    let currentMeal = { name: '', foods: [] }

    lines.forEach((line) => {
      console.log('line', line)
      // Skip empty lines
      if (line.trim() === '') {
        return
      }

      // Check if the line starts with "Meal"
      if (line.startsWith('Meal')) {
        // If we already have a meal, add it to the meals list
        if (currentMeal.name) {
          meals.push(currentMeal)
        }
        // Create a new meal object
        currentMeal = { name: line, foods: [] }
      } else {
        // Split the line by "(" to get the food name and details
        const parts = line.split('(')
        console.log('parts', parts)

        if (parts.length < 2) {
          return
        }
        // Trim any leading/trailing whitespace
        const foodName = parts.length > 0 && parts[0].trim()
        console.log('foodName', foodName)
        // Split the details string by ", " to get the individual details
        const details = parts[1].slice(0, -1).split(',')
        console.log('details', details)
        if (details.length < 4) {
          return
        }
        // Create a food object with the details
        const food = {
          name: foodName,
          calories: details[0].trim().split(' ')[0],
          protein: details[1].trim().split(' ')[0],
          fat: details[2].trim().split(' ')[0],
          carbs: details[3].trim().split(' ')[0],
        }
        console.log('food', food)
        // Add the food to the current meal's foods list
        currentMeal.foods.push(food)
      }
    })

    // Add the final meal to the meals list
    meals.push(currentMeal)

    console.log(meals)
    setMeals(meals)
    return meals
  }

  const handleSubmit = async (e) => {
    const BMR =
      66 +
      13.7 * e.target.weight.value +
      5 * e.target.height.value -
      6.8 * e.target.age.value
    console.log('BMR', BMR)

    const tdeeCalculated = BMR * e.target.activity.value
    console.log('TDEE', tdeeCalculated)
    setTdee(Math.ceil(tdeeCalculated))
    e.preventDefault()
    const response = await fetch('/api/diet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tdee: tdee,
      }),
    })
    const data = await response.json()
    if (response.status !== 200) {
      setError(data.detail)
      return
    }
    console.log('data', data)
    console.log('meals', formatResponse(data))
  }

  return (
    <main>
      <section className='pb-40 text-white bg-gray-800'>
        <Head>
          <title>Diet Plan Generator</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        {/* <header>
          <h1>FitnessAI.com</h1>
        </header> */}

        <form className='mx-auto max-w-lg mt-20' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='gender'
            >
              Gender
            </label>
            <select
              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='gender'
              name='gender'
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='age'
            >
              Age
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='age'
              name='age'
              type='number'
              placeholder='39'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='weight'
            >
              Weight (kg)
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='weight'
              type='number'
              name='weight'
              placeholder='79'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='height'
            >
              Height (cm)
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='height'
              type='number'
              name='height'
              placeholder='176'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='body-fat'
            >
              Body fat (%)
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='body-fat'
              type='number'
              name='fat'
              placeholder='25'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='activity-level'
            >
              Activity level
            </label>
            <select
              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='activity-level'
              name='activity'
            >
              <option value='1.2'>Sedentary (office job)</option>
              <option value='1.375'>Light Exercise (1-2 days/week)</option>
              <option value='1.55'>Moderate Exercise (3-5 days/week)</option>
              <option value='1.725'>Heavy Exercise (6-7 days/week)</option>
              <option value='1.9'>Athlete (2x per day)</option>
            </select>
          </div>
          <button
            className='block bg-teal-700  text-white font-bold mx-auto py-8 px-8 rounded-xl text-center '
            type='submit'
          >
            Generate Diet Plan now &gt;
          </button>
        </form>
      </section>

      <section className='relative overflow-hidden bg-cover bg-bottom text-neutral-800 pb-8 lg:pb-16 xl:pb-32 bg-gradient-to-b from-white to-neutral-300 astro-ASTJXEJC'>
        {tdee > 0 && (
          <div className='text-center text-2xl font-bold text-gray-800 p-4 rounded-md'>
            <span className='bg-gradient-to-r from-teal-400 to-blue-500'>
              Your Total Daily Energy Expensiture is 2412
            </span>
          </div>
        )}

        {meals && <MealTable meals={meals} />}

        <div className='fixed bottom-0 right-0 mb-4 mr-4'>
          <a
            href='https://twitter.com/sagarjani'
            className='right-0 bottom-0 mb-4 mr-4 font-mono text-white bg-black rounded-xl p-4 '
          >
            Made By @SagarJani
          </a>
        </div>
      </section>
      <footer className='bg-black text-white font-bold text-xl flex justify-center p-4'>
        <p>© 2023 AI Fitness Plan. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default Plan
