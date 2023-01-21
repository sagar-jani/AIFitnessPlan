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
  // console.log(calorie, protein, fat, carb)
  const bfastPrompt = "Give a high protein & low-fat breakfast meal to lose fat which has maximum 400 calories with 30 - 50g protein, 20 - 30g fat 100g carbs in format Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )"
  const planPrompt = `one-day diet with exact ${protein} g protein, ${fat} g fat, and ${carb} g carbs & exact calorie ${calorie} per day, 4 meals, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`
  const lunchPrompt = "Give a high protein & low-fat lunch meal for someone to lose fat, meal should not have more than 600 calories, should have protein: 60g, fat: 50g, include rice or roti, meal format should be: Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )"
  const dinnerPrompt = "Give a high protein & low-fat lunch meal for someone to lose fat, meal should not have more than 600 calories, should have protein: 60g, fat: 50g, include rice or roti, meal format should be: Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )"
  // prompt: "Diet plan with Calorie: 2547 Protein: 192g Fat: 100g Carbs: 223g",
    // prompt: "one-day diet with exact 231 g protein, 120 g fat, and 269 g carbs & exact calorie 2570 per day,  4 meals to build muscle, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs ) like Chris Gethin",



  const response = await openai.createCompletion({
    // prompt: 'give motivational quotes',
    // prompt: "Accurate 2570 calories diet chart with 231 g protein 120 g fat 269 g carbs divided 4 meals, mention calorie & macro details for each food item, and divide protein equally across all meals",
    model: "text-davinci-003",
    prompt: bfastPrompt,
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
    best_of: 1,
    n: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log('response.data', response.data.choices[0].text)
  res.end(JSON.stringify(response.data.choices[0].text));
}
