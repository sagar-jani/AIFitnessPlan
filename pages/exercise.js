import Head from "next/head"
import React from "react"
import { useState } from "react"
import LoadingDots from '../components/LoadingDots'
import WorkoutPlan from "../components/WorkoutPlan"
const ExercisePlanner = () => {
  const [loading, setLoading] = useState(false)
  const [workoutPlan, setWorkoutPlan] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // const BASE_URL = 'https://8yy45prgz5.execute-api.us-east-1.amazonaws.com/dev'
    try {
      const response = await fetch(`/api/exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foo: "bar"
        })

      })
      setLoading(false);
      if (!response.ok) {
        console.log("error", response.statusText);
        return;
      }

      const data = await response.json()
      console.log('workout', data.workoutPlan)

      setWorkoutPlan(data.workoutPlan)

    } catch (error) {
      // setError("Oops, something went wrong on our website! But don't worry, our team of monkeys are fixing it as we speak. In the meantime, go grab a drink and relax. We'll be back to normal soon.")
      console.log('An error occured while generating exercise plan', error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <Head>
        <title>Exercise Planner</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>

      <section className="h-screen justify-center text-center text-white px-10 py-10">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-20">
          Generate your <span className="text-blue-600">Exercise Plan</span>
        </h1>
        {!loading && (
          <button
            type='submit'
            onClick={handleSubmit}
            className="block bg-primary rounded-xl text-white text-xl md:text-2xl  mx-auto font-medium py-6 px-10  hover:bg-primary text-center ">
            Let&apos;s do some workout !
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

        {workoutPlan.length > 0 && <WorkoutPlan plan={workoutPlan} />}
      </section>
    </>
  )
}

export default ExercisePlanner