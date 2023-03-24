import { OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  console.log('req', req)


  // const prompt = "Generate a workout plan for someone with mix of cardio and strength training for 4 days per week, make sure to cover all muscle groups at least once. Include combination of compound and isolated exercises."
  const prompt = "Generate strength training workout plan for beginner 4 days per week (excluding rest day), and cover all muscle groups at least once. Include no more than 5 exercises daily, LISS  cardio on rest days."
  const suggestedPromptByGPT = "Create a 4-week workout plan for a beginner looking to build muscle and improve cardiovascular fitness. The user can exercise 5 days a week and has access to a gym with standard equipment. Include warm-ups, strength training exercises, and cardio workouts."
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
