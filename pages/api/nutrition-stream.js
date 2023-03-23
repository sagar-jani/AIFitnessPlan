import { OpenAIStream } from "../../utils/OpenAIStream";
import prisma from '../../lib/prismadb'

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  console.log('req', req)
  // const body = await req.json()
  const { body } = req
  console.log('body', body)

  const { goal, dietType, days } = body
  console.log('goal, dietType, days', goal, dietType, days)
  await prisma.user.update(
    {
      where: { email: "sagar.aj@gmail.com" },
      data: { generationCount: { increment: 1 } }
    }
  );


  const prompt = `Task: Analyse according to the instructions in my text. My Text: Create a protein-rich meal plan by strictly following these rules: 1- Goal: ${goal} 2- Diet Requirement: ${dietType}  3- For how many Days: ${days}  4- Make sure to include meals for lunch and dinner with macr count Output: ONLY MARKDOWN JSON. JSON Format example: [ {"Day": number,  "Meals": [{"Lunch": string, "Carbs": number, "Protein": number, "Fats": number}, {"Dinner": string, "Carbs": number, "Protein": number, "Fats": number}]}] `
  const payload = {
    model: "gpt-4",
    messages: [{ role: "system", content: 'You are an expert personal trainer with immense experience in exercise design, biomechanics etc ' }, { role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  console.log('payload', payload)
  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
