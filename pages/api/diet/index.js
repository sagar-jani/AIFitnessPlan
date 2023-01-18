import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {

  const calorie = Math.ceil(req.body.tdee)
  const protein = Math.ceil(req.body.protein)
  const fat = Math.ceil(req.body.fat)
  const carb = Math.ceil(req.body.carb)

  // const protein = 1.6 * req.body.weight
  // const fat = 1.6 * req.body.weight

  // const carbs = calorie - (protein * 4) + (fat * 9)
  console.log(calorie, protein, fat, carb)

  const planPrompt = `one-day diet with exact ${protein} g protein, ${fat} g fat, and ${carb} g carbs & exact calorie ${calorie} per day,  4 meals to build muscle, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs ) like Chris Gethin `
  console.log('planPrompt', planPrompt)
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: planPrompt,
  //   max_tokens: 2150,
  //   temperature: 0.66,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   best_of: 1
  // })
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "one-day diet with exact 231 g protein, 120 g fat, and 269 g carbs & exact calorie 2570 per day,  4 meals to build muscle, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs ) like Chris Gethin",
    temperature: 0.66,
    max_tokens: 2147,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log('response.data', response.data.choices[0].text)
  res.end(JSON.stringify(response.data.choices[0].text));
}
