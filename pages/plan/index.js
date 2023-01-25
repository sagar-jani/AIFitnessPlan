import React, { use, useRef, useState } from 'react'
import Head from 'next/head'
import MealTable from '../MealTable'
import Link from "next/link";
import MaintainanceCalorie from '../../components/maintainance-calorie';
import BMR from '../../components/bmr';
import MacroCalculation from '../../components/macro-calculation';
import CheckoutForm from '../../components/CheckoutForm';
import dynamic from 'next/dynamic'


import NoSSRWrapper from '../../components/dynamic'
import LoadingDots from '../../components/LoadingDots';
import Ingredients from '../../components/Ingredients';
import DividerDropdown from '../../components/dropdown';
import ExerciseSelection from '../../components/ExerciseSelection';
import Layout from '../../components/layout';

const Plan = () => {
  const [tdee, setTdee] = useState(0)
  const [error, setError] = useState('')
  const [meals, setMeals] = useState([])
  const [bmr, setBMR] = useState(0)
  const [activeTab, setActiveTab] = useState('Maintainance')
  const [dietType, setDietType] = useState('ModCarb')
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState()
  const [exercisePlanConsent, setExercisePlanConsent] = useState(false)

  const bmrAnalysisRef = useRef(null)

  const formatResponse = (response) => {
    console.log('format response', response)
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
      } else if (line.startsWith('Ingredients')) {
        const ingredients = line.substring(13).split(", ");
        setIngredients(ingredients)
      }
      else {
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

    console.log('meals', meals)
    setMeals(meals)
    return meals
  }

  const generateNutritionPlan = async () => {
    setLoading(true)

    const protein = dietType === 'modCarb' ? (tdee * 0.30) / 4 : dietType === 'lowCarb' ? (tdee * 0.40) / 4 : (tdee * 0.30) / 4
    const fat = dietType === 'modCarb' ? (tdee * 0.35) / 9 : dietType === 'lowCarb' ? (tdee * 0.40) / 9 : (tdee * 0.20) / 9
    const carb = dietType === 'modCarb' ? (tdee * 0.35) / 4 : dietType === 'lowCarb' ? (tdee * 0.20) / 4 : (tdee * 0.50) / 4

    const tdeeCalculated = activeTab === 'maintenance' ? tdee : activeTab === 'musclebuilding' ? tdee + 500 : tdee - 500

    const prompt = `one-day diet with exact ${Math.ceil(protein)} g protein, ${Math.ceil(fat)} g fat, and ${Math.ceil(carb)} g carbs & exact calorie ${Math.ceil(tdeeCalculated)} per day, 4 meals, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`

    console.log('Generating plan for', dietType, tdeeCalculated, activeTab)
    const BASE_URL = 'https://9585g9ydqf.execute-api.us-east-1.amazonaws.com/dev'
    try {
      const response = await fetch(`${BASE_URL}/diet-planner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt
        }),
      })

      console.log('response', response)
      const data = await response.json()
      console.log('meals', formatResponse(data.plan))

    } catch (error) {
      setError("Oops, something went wrong on our website! But don't worry, our team of monkeys are fixing it as we speak. In the meantime, go grab a drink and relax. We'll be back to normal soon.")
      console.log('An error occured while generating nutrition plan', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const bmrDerived = e.target.gender.value === 'Male' ? 88.362 + (13.397 * e.target.weight.value) + (4.799 * e.target.height.value) - (5.677 * e.target.age.value) : 447.593 + (9.247 * e.target.weight.value) + (3.098 * e.target.height.value) - (4.330 * e.target.age.value)
    setBMR(bmrDerived)
    document.getElementById('bmrAnalysisSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    const tdeeCalculated = bmrDerived * e.target.activity.value
    console.log('TDEE', tdeeCalculated)
    console.log('bmr', bmrDerived)
    setTdee(Math.ceil(tdeeCalculated))
  }

  return (
    <NoSSRWrapper>
      <Layout>
        <main>
          <section className='pb-40 text-white '>
            <Head>
              <title>Diet Plan Generator</title>
              <meta
                name='viewport'
                content='initial-scale=1.0, width=device-width'
              />
            </Head>
            <div className=' flex items-center justify-center flex-col '>
              <Link href="/" className='absolute top-0 left-0 pl-4 pt-2 font-medium text-white'>
                Fitness AI
              </Link>
              <h1 className='text-white text-5xl font-black mt-20 ' style={{ fontFamily: 'Inter, sans-serif' }}>
                AI POWERED FITNESS
              </h1>
              <p className='text-white text-lg font-black ' style={{ fontFamily: 'Inter, sans-serif' }}>
                Personalised nutrition plan to achieve your goal
              </p>
            </div>

            <form className='mx-auto max-w-lg mt-20' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-white text-sm font-bold mb-2' htmlFor='gender'>
                  Gender
                </label>
                <select
                  className='block appearance-none w-full  border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                <input required className="appearance-none block w-full  text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="age" type="text" placeholder="39"></input>
              </div>
              <div className='mb-4'>
                <label
                  className='block text-white text-sm font-bold mb-2'
                  htmlFor='weight'
                >
                  Weight (kg)
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
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
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
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
                  htmlFor='activity-level'
                >
                  Activity level
                </label>
                <select
                  className='block appearance-none w-full  border  text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                className='block py-6 px-8 bg-primary mt-10  text-white font-bold mx-auto font-medium rounded-xl text-center '
                type='submit'
              >

                Start Your Plan &gt;
              </button>
            </form>
          </section>


          <section className='justify-center items-center content-center' ref={bmrAnalysisRef} id="bmrAnalysisSection"  >
            {tdee > 0 && <> <MaintainanceCalorie tdee={tdee} bmr={bmr} />
              <BMR bmr={bmr} />
              <MacroCalculation tdee={tdee} activeTab={activeTab} setActiveTab={setActiveTab} dietType={dietType} setDietType={setDietType} />
              {/* <CheckoutForm /> */}

              {/* {ingredients && <Ingredients ingredients={ingredients} />} */}

              {/* <button onClick={generateNutritionPlan}
              className='block bg-teal-700 text-2xl text-white font-bold mx-auto py-8 px-8 rounded-xl text-center '
              type='submit'
            >
              Generate Nutrition Plan
            </button> */}

              {!loading && (
                <button
                  className="block bg-primary rounded-xl text-white  mx-auto font-medium py-6 px-8 mt-8 hover:bg-til/80 text-center "
                  onClick={(e) => generateNutritionPlan()}
                >
                  Generate Nutrition Plan &rarr;
                </button>
              )}

              {loading && (
                <button onClick={generateNutritionPlan}
                  className='block bg-primary text-2xl text-white font-bold mx-auto py-5 px-28 rounded-xl text-center'
                  type='submit'
                >
                  <LoadingDots color="white" style="large" />
                  <p>Please wait, this would take ~15 seconds.</p>
                </button>
              )}

              {/* {<div className='font-bold text-red-600'>{error}</div>}`   */}

            </>}


          </section>
          <section className='justify-center relative overflow-hidden bg-cover bg-bottom text-neutral-800 pb-8 lg:pb-16 xl:pb-32 from-white to-neutral-300 mt-10'>
            {meals.length > 0 && <MealTable meals={meals} />}
          </section>

          {/* <ExerciseSelection /> */}

          <section className='bg-gradient justify-center relative overflow-hidden bg-cover bg-bottom text-neutral-800 pb-8 lg:pb-16 xl:pb-32 bg-gradient-to-b from-white to-neutral-300 mt-10'>
            {meals.length > 0 &&
              <>
                <div className="text-center mb-5 mt-10">
                  <p className="text-5xl font-bold text-white">Let&apos;s generate exercise plan now !</p>
                </div>
                <ExerciseSelection />
              </>
            }

          </section>
          <footer className='text-white  font-bold text-xl flex justify-center p-4'>
            <div className='fixed bottom-0 right-0 mb-4 '>
              <a
                href='https://twitter.com/sagarjani'
                className='right-0 bottom-0 mb-4 mr-4 font-mono text-white bg-black rounded-xl p-4 '
              >
                Made By @SagarJani
              </a>
            </div>
            <p>© 2023 AI Fitness Plan. All rights reserved.</p>
          </footer>
        </main>
      </Layout>
    </NoSSRWrapper>
  )
}

export default Plan
