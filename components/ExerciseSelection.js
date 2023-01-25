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
      <div className="my-8 flex rounded-3xl p-6 bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10"><svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-8 w-8 flex-none [--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]"><defs><radialGradient cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" id=":r8:-gradient" gradientTransform="rotate(65.924 1.519 20.92) scale(25.7391)"><stop stop-color="#FDE68A" offset=".08"></stop><stop stop-color="#F59E0B" offset=".837"></stop></radialGradient><radialGradient cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" id=":r8:-gradient-dark" gradientTransform="matrix(0 24.5 -24.5 0 16 5.5)"><stop stop-color="#FDE68A" offset=".08"></stop><stop stop-color="#F59E0B" offset=".837"></stop></radialGradient></defs><g className="dark:hidden"><circle cx="20" cy="20" r="12" fill="url(#:r8:-gradient)"></circle><path d="M3 16c0 7.18 5.82 13 13 13s13-5.82 13-13S23.18 3 16 3 3 8.82 3 16Z" fill-opacity="0.5" className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="m15.408 16.509-1.04-5.543a1.66 1.66 0 1 1 3.263 0l-1.039 5.543a.602.602 0 0 1-1.184 0Z" className="fill-[var(--icon-foreground)] stroke-[color:var(--icon-foreground)]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 23a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill-opacity="0.5" stroke="currentColor" className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><g className="hidden dark:inline"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14-6.268 14-14 14S2 23.732 2 16Zm11.386-4.85a2.66 2.66 0 1 1 5.228 0l-1.039 5.543a1.602 1.602 0 0 1-3.15 0l-1.04-5.543ZM16 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="url(#:r8:-gradient-dark)"></path></g></svg><div className="ml-4 flex-auto"><p className="m-0 font-display text-xl text-amber-900 dark:text-amber-500">You should know!</p><div className="prose mt-2.5 text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300"><p>PicMachine does not support emojis. If you use emojis in your text, they will not be rendered.</p></div></div></div>
      <div className="my-8 flex rounded-3xl p-6 bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10"><svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-8 w-8 flex-none [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"><defs><radialGradient cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" id=":R99l6:-gradient" gradientTransform="matrix(0 21 -21 0 20 11)"><stop stop-color="#0EA5E9"></stop><stop stop-color="#22D3EE" offset=".527"></stop><stop stop-color="#818CF8" offset="1"></stop></radialGradient><radialGradient cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" id=":R99l6:-gradient-dark" gradientTransform="matrix(0 24.5001 -19.2498 0 16 5.5)"><stop stop-color="#0EA5E9"></stop><stop stop-color="#22D3EE" offset=".527"></stop><stop stop-color="#818CF8" offset="1"></stop></radialGradient></defs><g className="dark:hidden"><circle cx="20" cy="20" r="12" fill="url(#:R99l6:-gradient)"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M20 24.995c0-1.855 1.094-3.501 2.427-4.792C24.61 18.087 26 15.07 26 12.231 26 7.133 21.523 3 16 3S6 7.133 6 12.23c0 2.84 1.389 5.857 3.573 7.973C10.906 21.494 12 23.14 12 24.995V27a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.005Z" className="fill-[var(--icon-background)]" fill-opacity="0.5"></path><path d="M25 12.23c0 2.536-1.254 5.303-3.269 7.255l1.391 1.436c2.354-2.28 3.878-5.547 3.878-8.69h-2ZM16 4c5.047 0 9 3.759 9 8.23h2C27 6.508 21.998 2 16 2v2Zm-9 8.23C7 7.76 10.953 4 16 4V2C10.002 2 5 6.507 5 12.23h2Zm3.269 7.255C8.254 17.533 7 14.766 7 12.23H5c0 3.143 1.523 6.41 3.877 8.69l1.392-1.436ZM13 27v-2.005h-2V27h2Zm1 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm4 0h-4v2h4v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm0-2.005V27h2v-2.005h-2ZM8.877 20.921C10.132 22.136 11 23.538 11 24.995h2c0-2.253-1.32-4.143-2.731-5.51L8.877 20.92Zm12.854-1.436C20.32 20.852 19 22.742 19 24.995h2c0-1.457.869-2.859 2.122-4.074l-1.391-1.436Z" className="fill-[var(--icon-foreground)]"></path><path d="M20 26a1 1 0 1 0 0-2v2Zm-8-2a1 1 0 1 0 0 2v-2Zm2 0h-2v2h2v-2Zm1 1V13.5h-2V25h2Zm-5-11.5v1h2v-1h-2Zm3.5 4.5h5v-2h-5v2Zm8.5-3.5v-1h-2v1h2ZM20 24h-2v2h2v-2Zm-2 0h-4v2h4v-2Zm-1-10.5V25h2V13.5h-2Zm2.5-2.5a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5a2.5 2.5 0 0 0-2.5-2.5v2a.5.5 0 0 1 .5.5h2ZM18.5 18a3.5 3.5 0 0 0 3.5-3.5h-2a1.5 1.5 0 0 1-1.5 1.5v2ZM10 14.5a3.5 3.5 0 0 0 3.5 3.5v-2a1.5 1.5 0 0 1-1.5-1.5h-2Zm2.5-3.5a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5a2.5 2.5 0 0 0-2.5-2.5v2a.5.5 0 0 1 .5.5h2Z" className="fill-[var(--icon-foreground)]"></path></g><g className="hidden dark:inline"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 2C10.002 2 5 6.507 5 12.23c0 3.144 1.523 6.411 3.877 8.691.75.727 1.363 1.52 1.734 2.353.185.415.574.726 1.028.726H12a1 1 0 0 0 1-1v-4.5a.5.5 0 0 0-.5-.5A3.5 3.5 0 0 1 9 14.5V14a3 3 0 1 1 6 0v9a1 1 0 1 0 2 0v-9a3 3 0 1 1 6 0v.5a3.5 3.5 0 0 1-3.5 3.5.5.5 0 0 0-.5.5V23a1 1 0 0 0 1 1h.36c.455 0 .844-.311 1.03-.726.37-.833.982-1.626 1.732-2.353 2.354-2.28 3.878-5.547 3.878-8.69C27 6.507 21.998 2 16 2Zm5 25a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1 3 3 0 0 0 3 3h4a3 3 0 0 0 3-3Zm-8-13v1.5a.5.5 0 0 1-.5.5 1.5 1.5 0 0 1-1.5-1.5V14a1 1 0 1 1 2 0Zm6.5 2a.5.5 0 0 1-.5-.5V14a1 1 0 1 1 2 0v.5a1.5 1.5 0 0 1-1.5 1.5Z" fill="url(#:R99l6:-gradient-dark)"></path></g></svg><div className="ml-4 flex-auto"><p className="m-0 font-display text-xl text-pink-900 dark:text-pink-400">Beta notice</p><div className="prose mt-2.5 text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300"><p>PicMachine is currently in beta.</p><p>Users receive 300 free image generations per month until the official release.</p></div></div></div>
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
