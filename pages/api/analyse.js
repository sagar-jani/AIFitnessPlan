import { OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const body = await req.json()
  const { imageUrl } = body
  console.log('imageUrl', imageUrl)
  // const prompt = "Generate a workout plan for someone with mix of cardio and strength training for 4 days per week, make sure to cover all muscle groups at least once. Include combination of compound and isolated exercises."
  const prompt = `Here is video ${imageUrl}`

  const systemContent = `you're a renowned fitness professional and expert at exercise science, I would like you to do following
  - Analyse the video of a person performing the exercise
  - And give accurate feedback about technique and form etc
  - Respond with two sections - Exercise Name & Feedback`

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: systemContent }, { role: "user", content: prompt }],
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
