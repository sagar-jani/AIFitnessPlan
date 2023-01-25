import React, { useState } from 'react';
import WorkoutTable from './WorkoutTable';

const ExerciseSelection = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedTrainingType, setSelectedTrainingType] = useState('Home');
  const [error, setError] = useState('')
  const [workout, setWorkout] = useState([]);


  const formatWorkout = (workoutPlan) => {
    const workoutArray = [];

    const workoutLines = workoutPlan.split('\n');
    let currentDay = '';
    let currentExercises = [];

    workoutLines.forEach((line, index) => {
      if (line.startsWith('Day')) {
        if (currentDay !== '') {
          workoutArray.push({ day: currentDay, exercises: currentExercises });
        }
        currentDay = line;
        currentExercises = [];
        return;
      }

      if (line.startsWith('No.')) {
        return;
      }

      // line = line.replace(/\s{2,}/g, ' ');
      const [no, workout, sets, reps] = line.split('##');
      currentExercises.push({ no, workout, sets, reps });
    });

    workoutArray.push({ day: currentDay, exercises: currentExercises });
    console.log(workoutArray);
    setWorkout(workoutArray);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    // const prompt = `Generate workout plan for ${e.target.workout.value} to perform at ${selectedTrainingType} like day1, day2, day3`
    // const prompt = `Generate workout plan for ${e.target.workout.value} to perform at ${selectedTrainingType} like day1, day2, day3 in table format with columns - No, Workout, Sets, Reps`
    const prompt = "Generate workout plan for ${e.target.workout.value} to perform at Home like day1, day2, day3 in table format with columns separate by ## - No##Workout##Sets##Reps"
    try {
      const response = await fetch(`/api/ai`, {
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
      console.log('data', data)
      formatWorkout(data.plan)

    } catch (error) {
      setError("Oops, something went wrong on our website! But don't worry, our team of monkeys are fixing it as we speak. In the meantime, go grab a drink and relax. We'll be back to normal soon.")
      console.log('An error occured while generating nutrition plan', error)
    } finally {
      setLoading(false)
    }
  }


  const handleRadioChange = (e) => {
    setSelectedTrainingType(e.target.value);
  }


  return (
    <>

      {/* <pre className="prism-code language-json"><code><span className="token punctuation">{</span><span className="token plain"></span>
        <span className="token plain">  </span><span className="token property">"usage"</span><span className="token operator">:</span><span className="token plain"> </span><span className="token punctuation">{</span><span className="token plain"></span>
        <span className="token plain">    </span><span className="token property">"quota"</span><span className="token operator">:</span><span className="token plain"> </span><span className="token number">350</span><span className="token punctuation">,</span><span className="token plain"></span>
        <span className="token plain">    </span><span className="token property">"used"</span><span className="token operator">:</span><span className="token plain"> </span><span className="token number">276</span><span className="token punctuation">,</span><span className="token plain"></span>
        <span className="token plain">    </span><span className="token property">"remaining"</span><span className="token operator">:</span><span className="token plain"> </span><span className="token number">74</span><span className="token punctuation">,</span><span className="token plain"></span>
        <span className="token plain">    </span><span className="token property">"currentCycleStartDate"</span><span className="token operator">:</span><span className="token plain"> </span><span className="token string">"2022-12-22T00:00:00.000Z"</span><span className="token plain"></span>
        <span className="token plain">  </span><span className="token punctuation">}</span><span className="token punctuation">,</span><span className="token plain"></span>
        <span className="token plain">  </span><span className="token property">"url"</span><span className="token operator">:</span><span className="token plain"> </span><span className="token string">"&lt;a URL pointing to the generated image&gt;"</span><span className="token plain"></span>
        <span className="token plain"></span><span className="token punctuation">}</span>
      </code></pre> */}
      <form className='mx-auto max-w-lg mt-20 px-20' onSubmit={handleSubmit}>
        <div className="flex justify-center ">

          <div className="border-2 border-gray-600 ">
            <select id="workout" name="workout" className="appearance-none border  hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500">
              <option value='Strength Training 3x per week'>Strength Training 3x per week</option>
              <option value='Strength Training 5x per week'>Strength Training 5x per week</option>
              <option value='Strength Training 6x per week'>Strength Training 6x per week</option>
            </select>
            <div className="">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" value="Home" name="radio-group" onChange={handleRadioChange} defaultChecked />
                <span className="ml-2">Home Workout</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio" value="Commercial Gym" name="radio-group" onChange={handleRadioChange} />
                <span className="ml-2">Commercial Gym</span>
              </label>
            </div>
            <button
              className='block bg-teal-700  text-white font-bold mx-auto py-4 px-4 rounded-xl text-center  mb-4 mt-4'
              type='submit'
            >
              Generate Workout &gt;
            </button>
          </div>
        </div>
      </form>
      {workout.length > 0 && <WorkoutTable workoutArray={workout} />}

    </>
  );
};

export default ExerciseSelection;
