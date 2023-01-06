import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-aCwHAzBFpBxdEQUgQPlSD5N2",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {

  const tdeePrompt = `Please give TDEE as a whole number for a male who is ${req.body.age}  year old with ${req.body.fat} body fat, weighs ${req.body.weight} kg, height is ${req.body.height} cm and ${req.body.activity}`

  const planPrompt = `one-day diet with exact 112 g protein, 56 g fat, and 337 g carbs & exact calorie 2000 per day,  4 meals to build muscle, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: planPrompt,
    max_tokens: 4000,
    temperature: 0.7
  })
  console.log('response.data', response.data.choices[0].text )
  res.end(JSON.stringify(response.data.choices[0].text));
}
