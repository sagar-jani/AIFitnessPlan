const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

module.exports.workoutPlanner = async (event) => {
  const eventBody = JSON.parse(event.body);
  const { workoutType } = eventBody;


  const homePrompt = `Generate workout plan for ${workoutType} to perform at Home like day1, day2, day3 in table format with columns separate by | - No##Workout##Sets##Reps`
  // const gymPrompt = `Generate a workout plan for ${e.target.workout.value} for full body workout with weights comprising of the compound and isolated exercise like Jeff Nippard’s Big 5 in format like day1, day2, day3 in table format with columns separate by | - No|Workout|Sets|Reps`
  const gymPrompt = `Generate a workout plan for ${workoutType}  for full body workout with weights comprising of the compound and isolated exercise like Jeff Nippard’s Big 5 in clear headers like day1, day2, day3 in table format with columns separate by | - No|Workout|Sets|Reps|`
  const prompt = workoutType === 'Home' ? homePrompt : gymPrompt

  const testPrompt = `Task: Analyse according to the instructions in my text. My Text: Create a custom workout plan by strictly following these rules: 1- Gender: Male 2- Age: 29  3- Workout: 5 days per week 4 - Type of workout: Weight lifting 5-purpose: Gain muscle mass 6-workout location: Commercial Gym 7- Make sure to include exercises which cover all muscles Output: ONLY MARKDOWN JSON. JSON Format example: [ {"Day": number,  "Exercises": [{"Name": string, "sets": string, "reps": string, "Instructions": string}]}]`

  console.log('event.body', event.body)

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: testPrompt,
      temperature: 0.7,
      max_tokens: 3800,
      top_p: 0.7,
      best_of: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const data = response.data.choices[0].text
    console.log('data', data)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        plan: data
      })
    };
  } catch (error) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

module.exports.plan = async (event) => {

  const eventBody = JSON.parse(event.body);
  const { protein, fat, carb, tdeeCalculated, dietPattern } = eventBody;
  const prompt = `one-day diet for ${dietPattern} with exact ${Math.ceil(protein)} g protein, ${Math.ceil(fat)} g fat, and ${Math.ceil(carb)} g carbs & exact calorie ${Math.ceil(tdeeCalculated)} per day, 4 meals, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`

  console.log('event.body', event.body)

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 3800,
      top_p: 0.7,
      best_of: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const data = response.data.choices[0].text

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        plan: data
      })
    };
  } catch (error) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

module.exports.mealPlanner = async (event) => {

  const eventBody = JSON.parse(event.body);
  const { goal, dietType, days } = eventBody;
  const prompt = `Task: Analyse according to the instructions in my text. My Text: Create a protein-rich meal plan by strictly following these rules: 1- Goal: ${goal} 2- Diet Requirement: ${dietType}  3- For how many Days: ${days}  4- Make sure to include meals for lunch and dinner with macr count Output: ONLY MARKDOWN JSON. JSON Format example: [ {"Day": number,  "Meals": [{"Lunch": string, "Carbs": number, "Protein": number, "Fats": number}, {"Dinner": string, "Carbs": number, "Protein": number, "Fats": number}]}] `

  console.log('event.body', event.body)

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 3800,
      top_p: 0.7,
      best_of: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const data = response.data.choices[0].text

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        meal: data
      })
    };
  } catch (error) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}
