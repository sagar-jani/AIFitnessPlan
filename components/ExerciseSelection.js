import React, { useState } from 'react';
import LoadingDots from './LoadingDots';
import WorkoutTable from './WorkoutTable';

const ExerciseSelection = () => {
  const [loading, setLoading] = useState(false)
  const [selectedTrainingType, setSelectedTrainingType] = useState('Home');
  const [error, setError] = useState('')
  const [workout, setWorkout] = useState([]);


  const tailwindStyles = `
  .bg-gradient-red {
      background-image: linear-gradient(90deg, rgba(131, 58, 180, .9) 0%, rgba(253, 29, 29, .9) 100%);
  }
`;

  const formatWorkout = (workoutPlan) => {
    const workoutArray = [];

    const workoutLines = workoutPlan.split('\n');
    let currentDay = '';
    let currentExercises = [];

    workoutLines.forEach((line, index) => {

      if (line.startsWith('Day')) {
        let day = line.split("|")
        console.log('day1', day)
        if (day.length < 1) {

          day = line.split("|");
          console.log('day2', day)
          if (day.length < 1) {
            line = line.replace(/\s{2,}/g, " ");
            day = line.split(" ");
            console.log('day3', day)
          }
        }
        if (currentDay !== '') {
          workoutArray.push({ day: currentDay, exercises: currentExercises });
        }
        currentDay = day;
        currentExercises = [];
        return;
      }

      if (line.startsWith('No.')) {
        return;
      }


      let [no, workout, sets, reps] = line.split("##");
      if (line.split("##").length <= 1) {
        [no, workout, sets, reps] = line.split("|");
        if (line.split("|").length <= 1) {
          line = line.replace(/\s{2,}/g, " ");
          [no, workout, sets, reps] = line.split(" ");
        }
      }

      currentExercises.push({ no, workout, sets, reps });
    });

    workoutArray.push({ day: currentDay, exercises: currentExercises });
    console.log(workoutArray);
    setWorkout(workoutArray);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const homePrompt = `Generate workout plan for ${e.target.workout.value} to perform at Home like day1, day2, day3 in table format with columns separate by | - No##Workout##Sets##Reps`
    // const gymPrompt = `Generate a workout plan for ${e.target.workout.value} for full body workout with weights comprising of the compound and isolated exercise like Jeff Nippard’s Big 5 in format like day1, day2, day3 in table format with columns separate by | - No|Workout|Sets|Reps`
    const gymPrompt = `Generate a workout plan for ${e.target.workout.value}  for full body workout with weights comprising of the compound and isolated exercise like Jeff Nippard’s Big 5 in clear headers like day1, day2, day3 in table format with columns separate by | - No|Workout|Sets|Reps|`
    const prompt = e.target.workout.value === 'Home' ? homePrompt : gymPrompt
    console.log('e.target.workout.value', e.target.workout.value)
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

      <style>{tailwindStyles}</style>
      <div className="flex justify-center bg-gradient ">
        <div className="border rounded p-4 w-1/2 mx-auto flex flex-col items-center">
          <div className="bg-gradient-red text-white py-2 px-4 text-2xl rounded-t-lg text-center font-medium">Exercise Selection</div>
          <form className="w-full py-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex -mx-2 w-full justify-between text-center">
              <div className="mx-auto">
                <label className="block text-white text-lg">
                  <input
                    type="radio"
                    value="Home"
                    id="workout"
                    checked={selectedTrainingType === 'Home'}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  Home Workout
                </label>
              </div>
              <div className="mx-auto">
                <label className="block text-white text-lg">
                  <input
                    id="workout"
                    type="radio"
                    value="Commercial Gym"
                    checked={selectedTrainingType === 'Commercial Gym'}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  Commercial Gym
                </label>
              </div>
            </div>

            {
              !loading && <div className="flex justify-center">
                <button className="bg-primary text-center text-white py-2 px-4 rounded-full hover:bg-blue-600">
                  Submit
                </button>
              </div>
            }

            {loading && (
              <div className="flex justify-center">
                <button className="bg-primary text-center text-white py-2 px-4 rounded-full hover:bg-blue-600">
                  <LoadingDots color="white" style="large" />
                </button>
              </div>
            )}


          </form>
        </div>
      </div>


      {workout.length > 0 && <WorkoutTable workoutArray={workout} />}

    </>
  );
};

export default ExerciseSelection;
