import React, { useState } from "react";
import { dietTypes } from "../utils/dropDownTypes";
import DropDownTransition from "./DropDownTransition";
import LoadingDots from "./LoadingDots";
import MacroRecipeFormat from "./MacroRecipeFormat";
import { useSession, signIn } from "next-auth/react";
import { Rings } from "react-loader-spinner";
import ResizablePanel from "./ResizablePanel";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const MacroRecipe = ({ disabled }) => {
  const [loading, setLoading] = useState(false)
  const [macro, setMacro] = useState(null)
  const [meals, setMeals] = useState([])
  const [dietType, setDietType] = useState("No Dietary Restrictions")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/macro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protein: e.target.protein.value,
          fats: e.target.fats.value,
          carbs: e.target.carbs.value,
          dietType: dietType,
        }),
      })
      setLoading(false);
      if (!response.ok) {
        console.log("error", response.statusText);
        return;
      }

      const data = await response.json()
      console.log('meal', data.meal)
      console.log('meal', data.meal.answer)
      if (data?.meal?.Answer) {
        console.log('answer')
        setMeals(data?.meal?.Answer)
      } else {
        setMeals(data.meal)
      }
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
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <motion.div className="flex flex-col justify-center items-center w-full  mx-auto mt-4 text-lg md:text-xl">
            <form onSubmit={handleSubmit} className="w-2/3">
              <div className="flex mt-6 w-full items-center space-x-3 my-2 ">
                <Image
                  src="/images/number-1-white.svg"
                  width={30}
                  height={30}
                  alt="1 icon"
                />
                <p className="text-left font-medium text-white">
                  Target Protein ?
                </p>
              </div>
              <div className='mb-10'>
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
                <div className="flex mt-6 w-96 items-center space-x-3 my-2 ">
                  <Image
                    src="/images/number-2-white.svg"
                    width={30}
                    height={30}
                    alt="1 icon"
                  />
                  <p className="text-left font-medium text-white">
                    Target Carbs ?
                  </p>
                </div>
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
                <div className="flex mt-6 w-96 items-center space-x-3 my-2 ">
                  <Image
                    src="/images/number-3-white.svg"
                    width={30}
                    height={30}
                    alt="1 icon"
                  />
                  <p className="text-left font-medium text-white">
                    Target Fats ?
                  </p>
                </div>
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
                <div className="flex mt-6 w-96 items-center space-x-3 my-2 ">
                  <Image
                    src="/images/number-3-white.svg"
                    width={30}
                    height={30}
                    alt="1 icon"
                  />
                  <p className="text-left font-medium text-white">
                    Dietary requirements ?
                  </p>
                </div>

                <DropDownTransition value={dietType} setValue={(diet) => setDietType(diet)} values={dietTypes} />
              </div>

              {!loading && (
                <button
                  type='submit'
                  disabled={disabled}
                  className={`block   rounded-xl text-white text-xl  mx-auto font-medium py-6 px-8 mt-8  text-center ${disabled ? "bg-blue-200 hover:bg-blue-200" : "bg-primary hover:bg-primary"}`}>
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
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
      {meals.length > 0 && <MacroRecipeFormat meals={meals} />}

    </>
  )
}

export default MacroRecipe;