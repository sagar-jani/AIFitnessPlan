import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-aCwHAzBFpBxdEQUgQPlSD5N2",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {

  const calorie = req.body.tdee - 300
  const protein = 1.6 * req.body.weight
  const fat = 1.6 * req.body.weight

  const carbs = calorie - (protein * 4) + (fat * 9)
  console.log(calorie, protein, fat, carbs)

  const planPrompt = `one-day diet with exact ${protein} g protein, ${fat} g fat, and ${carbs} g carbs & exact calorie ${calorie} per day,  4 meals to build muscle, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`
  console.log('planPrompt', planPrompt)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: planPrompt,
    max_tokens: 4000,
    temperature: 0.7
  })
  console.log('response.data', response.data.choices[0].text)
  res.end(JSON.stringify(response.data.choices[0].text));
}
