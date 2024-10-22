import React, { use, useRef, useState } from 'react'
import Head from 'next/head'
import MealTable from '../MealTable'
import Link from "next/link";
import MaintainanceCalorie from '../../components/maintainance-calorie';
import BMR from '../../components/bmr';
import MacroCalculation from '../../components/macro-calculation';
import CheckoutForm from '../../components/CheckoutForm';
import Image from 'next/image';


import NoSSRWrapper from '../../components/dynamic'
import LoadingDots from '../../components/LoadingDots';
import ExerciseSelection from '../../components/ExerciseSelection';
import MealPlanner from '../../components/MealPlanner';
import Dropdown from '../../components/dropdown';
import GoalsDropdown from '../../components/GoalsDropdown';
import DietTypeDropDown from '../../components/DietType';
import DropDownTransition from '../../components/DropDownTransition';
import { activityLevels, genders } from '../../utils/dropDownTypes';
import ResizablePanel from '../../components/ResizablePanel';
import { AnimatePresence, motion } from 'framer-motion';
import { getSession, signIn, useSession } from 'next-auth/react';
import { Rings } from 'react-loader-spinner';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar'
import Script from 'next/script';


const Plan = ({ user }) => {
  const [tdee, setTdee] = useState(0)
  const [error, setError] = useState('')
  const [meals, setMeals] = useState([])
  const [bmr, setBMR] = useState(0)
  const [activeTab, setActiveTab] = useState('Maintainance')
  const [dietType, setDietType] = useState('ModCarb')
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState()
  const [chart, setChart] = useState("")
  const [activityLevel, setActivityLevel] = useState("Sedentary (office job)")
  const [gender, setGender] = useState("Female")


  const [dietPattern, setDietPattern] = useState('Vegetarian');
  const [cuisine, setCuisine] = useState('Italian');

  const { data: session, status } = useSession();

  const bmrAnalysisRef = useRef(null)


  function getActivityLevelValue(label) {
    switch (label) {
      case 'Sedentary (office job)':
        return 1.2;
      case 'Light Exercise (1-2 days/week)':
        return 1.375;
      case 'Moderate Exercise (3-5 days/week)':
        return 1.55;
      case 'Heavy Exercise (6-7 days/week)':
        return 1.725;
      case 'Athlete (2x per day)':
        return 1.9;
      default:
        throw new Error(`Invalid activity level label: ${label}`);
    }
  }



  const formatResponse = (response) => {
    const meals = []

    // Split the response into lines
    const lines = response.split('\n')

    let currentMeal = { name: '', foods: [] }

    lines.forEach((line) => {
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

        if (parts.length < 2) {
          return
        }
        // Trim any leading/trailing whitespace
        const foodName = parts.length > 0 && parts[0].trim()
        // Split the details string by ", " to get the individual details
        const details = parts[1].slice(0, -1).split(',')

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
        // Add the food to the current meal's foods list
        currentMeal.foods.push(food)
      }
    })

    // Add the final meal to the meals list
    meals.push(currentMeal)
    setMeals(meals)
    return meals
  }


  const mealServe = [];
  let buffer = '';

  const generateNutritionPlan = async () => {
    setLoading(true)

    const protein = dietType === 'modCarb' ? (tdee * 0.30) / 4 : dietType === 'lowCarb' ? (tdee * 0.40) / 4 : (tdee * 0.30) / 4
    const fat = dietType === 'modCarb' ? (tdee * 0.35) / 9 : dietType === 'lowCarb' ? (tdee * 0.40) / 9 : (tdee * 0.20) / 9
    const carb = dietType === 'modCarb' ? (tdee * 0.35) / 4 : dietType === 'lowCarb' ? (tdee * 0.20) / 4 : (tdee * 0.50) / 4

    const tdeeCalculated = activeTab === 'maintenance' ? tdee : activeTab === 'musclebuilding' ? tdee + 500 : tdee - 500

    // const prompt = `one-day diet for ${dietPattern} with exact ${Math.ceil(protein)} g protein, ${Math.ceil(fat)} g fat, and ${Math.ceil(carb)} g carbs & exact calorie ${Math.ceil(tdeeCalculated)} per day, 4 meals, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`
    const BASE_URL = 'https://8yy45prgz5.execute-api.us-east-1.amazonaws.com/dev'
    try {
      const response = await fetch(`${BASE_URL}/diet`, {
        // const response = await fetch(`api/nutrition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dietPattern,
          protein,
          fat,
          carb,
          tdeeCalculated
        }),
      })

      if (!response.ok) {
        console.log("error", response.statusText);
        return;
      }

      setLoading(false);

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
    const bmrDerived = gender === 'Male' ? 88.362 + (13.397 * e.target.weight.value) + (4.799 * e.target.height.value) - (5.677 * e.target.age.value) : 447.593 + (9.247 * e.target.weight.value) + (3.098 * e.target.height.value) - (4.330 * e.target.age.value)
    setBMR(bmrDerived)
    document.getElementById('bmrAnalysisSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    const tdeeCalculated = bmrDerived * getActivityLevelValue(activityLevel)
    setTdee(Math.ceil(tdeeCalculated))
  }

  return (
    // <main className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">

    // <div className="flex w-full px-20  flex-col py-2 min-h-screen">
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
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
        <main className="flex flex-1 w-full flex-col  text-center px-4 mt-4 sm:mb-0 mb-8">
          {/* <main className="flex flex-1 w-full flex-col items-center justify-center text-center text-black px-4 mt-4 sm:mb-0 mb-8"> */}
          <section>
            <div className='flex items-center justify-center flex-col '>
              <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
                Generate your <span className="text-blue-600">Fitness Plan</span>
              </h1>
            </div>
            <ResizablePanel>
              <AnimatePresence mode="wait">
                <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                  {status !== "authenticated" ? (
                    <div className="h-[250px] flex flex-col items-center space-y-6 text-xl">
                      <div className="max-w-xl text-gray-300">
                        Sign in below with Google to create a free account and
                        generate your fitness plan today.
                        You will be able to do generate 3 plans (nutrition/exercise/meals).
                      </div>
                      <button
                        onClick={() => signIn("google")}
                        className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                      >
                        <Image
                          src="/images/google.png"
                          width={20}
                          height={20}
                          alt="google's logo"
                        />
                        <span>Sign in with Google</span>
                      </button>
                    </div>
                  ) :

                    <>
                      <form className='flex items-center justify-center flex-col  mx-auto mt-5 w-1/2  text-xl' onSubmit={handleSubmit}>
                        <div className="space-y-4 w-full max-w-sm">
                          <div className="flex mt-3 items-center space-x-3">

                            <p className="text-left font-medium text-white">
                              Choose gender.
                            </p>
                          </div>
                          <DropDownTransition
                            value={gender}
                            // @ts-ignore
                            setValue={(newValue) => setGender(newValue)}
                            values={genders}
                          />
                        </div>

                        <div className="space-y-4 w-full max-w-sm">
                          <div className="flex mt-3 items-center space-x-3">

                            <p className="text-left font-medium text-white">
                              What is your age ?
                            </p>
                          </div>
                          <input required className="appearance-none block w-full  text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="age" type="text" placeholder="39"></input>
                        </div>


                        <div className="space-y-4 w-full max-w-sm">
                          <div className="flex mt-3 items-center space-x-3">

                            <p className="text-left font-medium text-white">
                              What is your weight (kg) ?
                            </p>
                          </div>
                          <input
                            className='shadow appearance-none border rounded w-full py-3 px-4 text-black leading-tight focus:outline-none focus:shadow-outline'
                            id='weight'
                            type='number'
                            name='weight'
                            placeholder='79'
                            required
                          />
                        </div>

                        <div className="space-y-4 w-full max-w-sm">
                          <div className="flex mt-3 items-center space-x-3">

                            <p className="text-left font-medium text-white">
                              What is your height (cm) ?
                            </p>
                          </div>
                          <input
                            className='shadow appearance-none border rounded w-full py-3 px-4 text-black leading-tight focus:outline-none focus:shadow-outline'
                            id='height'
                            type='number'
                            name='height'
                            placeholder='176'
                            required
                          />
                        </div>

                        <div className="space-y-4 w-full max-w-sm">
                          <div className="flex mt-3 items-center space-x-3">

                            <p className="text-left font-medium text-white">
                              Choose your activity level.
                            </p>
                          </div>
                          <DropDownTransition
                            value={activityLevel}
                            // @ts-ignore
                            setValue={(newValue) => setActivityLevel(newValue)}
                            values={activityLevels}
                          />
                        </div>

                        <div className="flex space-x-2 justify-center">
                          <button
                            className='w-full py-2 px-6 sm:py-6 sm:px-8 bg-primary mt-10  text-white font-medium mx-auto text-lg sm:text-xl rounded-xl text-center '
                            type='submit'
                          >
                            Start Your Plan &gt;
                          </button>
                        </div>
                      </form>
                    </>
                  }
                </motion.div>
              </AnimatePresence>
            </ResizablePanel>
          </section>


          <section className='flex flex-col justify-center items-center content-center py-20' ref={bmrAnalysisRef} id="bmrAnalysisSection"  >
            {tdee > 0 && <> <MaintainanceCalorie tdee={tdee} bmr={bmr} />
              <BMR bmr={bmr} />
              <MacroCalculation tdee={tdee} activeTab={activeTab} setActiveTab={setActiveTab} dietType={dietType} setDietType={setDietType} />

              {status === "loading" ? (
                <div className="max-w-[670px] h-[250px] flex justify-center items-center">
                  <Rings
                    height="100"
                    width="100"
                    color="black"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </div>
              ) : status === "authenticated" ? (
                <MealPlanner />
              ) : (

                <div className="flex py-20  flex-col justify-center items-center space-y-6">
                  <div className=" text-white text-xl md:text-2xl">
                    Sign in below with Google to create a free account and generate workout plan.
                  </div>
                  <button
                    onClick={() => signIn("google")}
                    className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                  >
                    <Image
                      src="/images/google.png"
                      width={20}
                      height={20}
                      alt="google's logo"
                    />
                    <span>Sign in with Google</span>
                  </button>
                </div>

              )}


              {/* <CheckoutForm /> */}

              {/* {ingredients && <Ingredients ingredients={ingredients} />} */}

              {/* <button onClick={generateNutritionPlan}
              className='block bg-teal-700 text-2xl text-white font-bold mx-auto py-8 px-8 rounded-xl text-center '
              type='submit'
            >
              Generate Nutrition Plan
            </button> */}

              {/* <NutritionInput setDietPattern={setDietPattern} setCuisine={setCuisine} cuisine={cuisine} dietPattern={dietPattern} /> */}


            </>}

          </section>

          <section className='justify-center relative overflow-hidden bg-cover bg-bottom text-neutral-800 pb-8 lg:pb-16 xl:pb-32 from-white to-neutral-300 mt-10'>
            {meals.length > 0 && <MealTable meals={meals} />}
          </section>

          {/* <ExerciseSelection /> */}

          <section className='justify-center relative overflow-hidden bg-cover bg-bottom text-neutral-800 pb-8 lg:pb-16 xl:pb-32 bg-gradient-to-b mt-10'>
            {meals.length > 0 &&
              <>
                <div className="text-center mb-5 mt-10">
                  <p className="text-5xl font-bold text-white">Let&apos;s generate exercise plan now !</p>
                </div>
                <ExerciseSelection />
              </>
            }

            {chart && (
              <div className="mb-10 px-4">
                <h2 className="mx-auto mt-16 max-w-3xl border-t text-white pt-8 text-center text-3xl font-bold sm:text-5xl">
                  Summary
                </h2>
                <div className="mx-auto mt-6 max-w-3xl text-lg leading-7 text-white">
                  {chart.split(". ").map((sentence, index) => (
                    <div key={index}>
                      {sentence.length > 0 && (
                        <li className="mb-2 list-disc">{sentence}</li>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div >
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   console.log('session', session)
//   console.log('email', session?.user?.email)
//   const user = await prisma.user.findUnique({
//     where: {
//       email: session?.user?.email,
//     },
//   })
//   console.log('generationCount', user?.generationCount)
//   return {
//     props: {
//       user,
//     },
//   }
// }

export default Plan
