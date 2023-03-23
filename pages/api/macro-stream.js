import { OpenAIStream } from "../../utils/OpenAIStream";
import prisma from '../../lib/prismadb'

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req, res) => {
  console.log('req', req)
  const body = await req.json()
  console.log('coming to macro handler', body)
  await prisma.user.update(
    {
      where: { email: "sagar.aj@gmail.com" },
      data: { generationCount: { increment: 1 } }
    }
  );

  // const prompt = "Generate a workout plan for someone with mix of cardio and strength training for 4 days per week, make sure to cover all muscle groups at least once. Include combination of compound and isolated exercises."
  // const prompt = "Generate strength training workout plan for beginner 4 days per week (excluding rest day), and cover all muscle groups at least once. Include no more than 5 exercises daily, LISS  cardio on rest days."
  // const suggestedPromptByGPT = "Create a 4-week workout plan for a beginner looking to build muscle and improve cardiovascular fitness. The user can exercise 5 days a week and has access to a gym with standard equipment. Include warm-ups, strength training exercises, and cardio workouts."
  const { protein, fats, carbs, dietType } = body
  console.log('protein, fats, carbs, dietType', protein, fats, carbs, dietType);
  const prompt = `Task: Analyse according to the instructions in my text. My Text: Generate one healthy recipe by strictly following these rules: 1- Protein: ${protein}g 2- Fats: ${fats}g  3- Carbs: 4${carbs}g  4- Diet type: ${dietType} Output: ONLY MARKDOWN JSON. JSON Format example: {"RecipeName": string, "Difficulty": string, KitchenTools: string[] "Instructions": string[], "Ingredients": string[]}`

  const payload = {
    model: "gpt-4",
    messages: [{ role: "system", content: 'You are world renowned nutrition expert with immense experience in food, macro, science etc ' }, { role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  console.log('returning stream')
  return new Response(stream);
};

export default handler;
