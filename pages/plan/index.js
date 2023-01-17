import React, { useState } from 'react'
import Head from 'next/head'
import MealTable from '../MealTable'
import Link from "next/link";
import MaintainanceCalorie from '../../components/maintainance-calorie';
import BMR from '../../components/bmr';
import MacroCalculation from '../../components/macro-calculation';
import CheckoutForm from '../../components/CheckoutForm';

const Plan = () => {
  const [tdee, setTdee] = useState(0)
  const [error, setError] = useState(null)
  const [meals, setMeals] = useState([])
  const [bmr, setBMR] = useState(0)
  const [activeTab, setActiveTab] = useState('Maintainance')
  const [dietType, setDietType] = useState('ModCarb')

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

  const generateNutritionPlan = async () => {

    const tdeeCalculated = activeTab === 'maintenance' ? tdee : activeTab === 'musclebuilding' ? tdee + 500 : tdee - 500
    console.log('Generating plan for', dietType, tdeeCalculated, activeTab)
    // const response = await fetch('/api/diet', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     tdee: tdee,
    //   }),
    // })
    // const data = await response.json()
    // if (response.status !== 200) {
    //   setError(data.detail)
    //   return
    // }
    // console.log('data', data)
    // console.log('meals', formatResponse(data))
  }

  const handleSubmit = async (e) => {

    const bmrDerived = e.target.gender.value === 'Male' ? 88.362 + (13.397 * e.target.weight.value) + (4.799 * e.target.height.value) - (5.677 * e.target.age.value) : 447.593 + (9.247 * e.target.weight.value) + (3.098 * e.target.height.value) - (4.330 * e.target.age.value)

    setBMR(bmrDerived)

    const tdeeCalculated = bmrDerived * e.target.activity.value
    console.log('TDEE', tdeeCalculated)
    console.log('bmr', bmrDerived)
    setTdee(Math.ceil(tdeeCalculated))
    e.preventDefault()
    // const response = await fetch('/api/diet', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     tdee: tdee,
    //   }),
    // })
    // const data = await response.json()
    // if (response.status !== 200) {
    //   setError(data.detail)
    //   return
    // }
    // console.log('data', data)
    // console.log('meals', formatResponse(data))
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
        <div className='bg-gray-800 flex items-center justify-center flex-col '>
          <Link href="/" className='absolute top-0 left-0 pl-4 pt-2 font-medium text-white'>
            Fitness AI
          </Link>
          <h1 className='text-white text-5xl font-bold mt-20'>
            AI POWERED FITNESS
          </h1>
          <p className='text-white text-lg font-outline'>
            Personalised nutrition plan to achieve your goal
          </p>
        </div>

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
              required
            </select>
          </div>
          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='age'
            >
              Age
            </label>
            <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="age" type="text" placeholder="39"></input>
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
              required
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
              required
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
              required
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
              required
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
            Start Your Plan &gt;
          </button>
        </form>
      </section>


      <section className='justify-center items-center content-center'>
        {tdee > 0 && <> <MaintainanceCalorie tdee={tdee} bmr={bmr} />
          <BMR bmr={bmr} />
          <MacroCalculation tdee={tdee} activeTab={activeTab} setActiveTab={setActiveTab} dietType={dietType} setDietType={setDietType} />
          {/* <CheckoutForm /> */}
          <button onClick={generateNutritionPlan}
            className='block bg-teal-700 text-2xl text-white font-bold mx-auto py-8 px-8 rounded-xl text-center '
            type='submit'
          >
            Generate Nutrition Plan
          </button>

        </>}


      </section>

      <section className='justify-center relative overflow-hidden bg-cover bg-bottom text-neutral-800 pb-8 lg:pb-16 xl:pb-32 bg-gradient-to-b from-white to-neutral-300 mt-10'>
        {meals.length > 0 && <MealTable meals={meals} />}

        <div className='fixed bottom-0 right-0 mb-4 '>
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
