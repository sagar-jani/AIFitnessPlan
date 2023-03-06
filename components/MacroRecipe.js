import React, { useState } from "react";
import { dietTypes } from "../utils/dropDownTypes";
import DropDownTransition from "./DropDownTransition";
import LoadingDots from "./LoadingDots";
import MacroRecipeFormat from "./MacroRecipeFormat";
import MealFormat from "./MealFormat";

const MacroRecipe = () => {
  const [loading, setLoading] = useState(false)
  const [macro, setMacro] = useState(null)
  const [meals, setMeals] = useState([])
  const [dietType, setDietType] = useState("No Dietary Restrictions")
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const BASE_URL = 'https://8yy45prgz5.execute-api.us-east-1.amazonaws.com/dev'
    try {
      const response = await fetch(`${BASE_URL}/macro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protein: e.target.protein.value,
          fats: e.target.protein.value,
          carbs: e.target.protein.value,
          dietType: e.target.dietType.value,
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

    } catch (error) {
      // setError("Oops, something went wrong on our website! But don't worry, our team of monkeys are fixing it as we speak. In the meantime, go grab a drink and relax. We'll be back to normal soon.")
      console.log('An error occured while generating nutrition plan', error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <>
      <div className="text-center mb-5 mt-10">
        <p className="text-white text-5xl font-bold">Macro Planner </p>
      </div>
      <form className='mx-auto mt-20 w-1/2 text-xl' onSubmit={handleSubmit}>
        <div className='mb-10'>
          <label
            className='block text-white font-bold mb-2'
            htmlFor='protein'
          >
            Protein
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
            id='protein'
            name='protein'
            type='number'
            placeholder='0'
            required
          />
        </div>

        <div className='mb-10'>
          <label
            className='block text-white font-bold mb-2'
            htmlFor='carbs'
          >
            Carbs
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
            id='carbs'
            name='carbs'
            type='number'
            placeholder='0'
            required
          />
        </div>

        <div className='mb-10'>
          <label
            className='block text-white font-bold mb-2'
            htmlFor='fats'
          >
            Fats
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
            id='fats'
            name='fats'
            type='number'
            placeholder='0'
            required
          />
        </div>

        <div className='mb-10'>
          <label className='block text-white font-bold mb-5' htmlFor='dietType'>
            Choose your Dietary Requirment
          </label>
          {/* <select
            className='block appearance-none w-full  border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='dietType'
            name='dietType'
          >
            <option value='No Dietary Restrictions'>No Dietary Restrictions</option>
            <option value='Pescatarian'>Pescatarian</option>
            <option value='Ovo-vegetarian'>Ovo-Vegetarian</option>
            <option value='Vegetarian'>Vegetarian</option>
            <option value='Vegan'>Vegan</option>
            <option value='Dairy-Free'>Dairy-Free</option>
            <option value='Gluten-Free'>Gluten-Free</option>
          </select> */}
          <DropDownTransition value={dietType} setValue={(diet) => setDietType(diet)} values={dietTypes} />
        </div>


        {!loading && (
          <button
            type='submit'
            className="block bg-primary rounded-xl text-white text-xl  mx-auto font-medium py-6 px-8 mt-8 hover:bg-primary text-center ">
            Generate Recipe &rarr;
          </button>
        )}

        {loading && (
          <button
            className='block bg-primary text-2xl text-white font-bold mx-auto py-5 px-28 rounded-xl text-center'
            type='submit'
          >
            <LoadingDots color="white" style="large" />
          </button>
        )}
      </form>
      {meals.length > 0 && <MacroRecipeFormat meals={meals} />}
    </>
  )
}

export default MacroRecipe;