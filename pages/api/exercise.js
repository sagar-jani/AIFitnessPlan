
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// export const config = {
//   runtime: "edge",
// };

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const handler = async (req, res) => {
  const body = await req.json()
  console.log('body', body)

  // Check if user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(500).json("Login to upload.");
  }

  const { goal, days, dietType } = req.body;
  const prompt = `Task: Analyse according to the instructions in my text. My Text: Generate exercise plan for Day 1 - push, Day -2 - legs and Day 3- Pull. Number of exercises per day: at least 4. Output: ONLY MARKDOWN JSON.  JSON Format example:  [ {"Day": number,  "Exercises": [{"Name": string, "sets": number, "reps": number}]}]`

  const payload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    n: 1,
  };

  const response = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  console.log('response', response)

  const data = await response.json()
  console.log('data', data)
  console.log('text', data.choices[0].text)

  const result = data.choices[0].text
  return new Response(
    JSON.stringify({
      workoutPlan: result,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'charset': 'utf-8',
      },
    }
  )
}

export default handler;