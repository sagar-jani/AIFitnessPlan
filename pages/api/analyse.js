import { OpenAIStream } from "../../utils/OpenAIStream";
import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from '../../lib/prismadb'

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

// export const config = {
//   runtime: "edge",
// };

// Create a new ratelimiter, that allows 3 requests per 24 hours
// const ratelimit = redis
//   ? new Ratelimit({
//     redis: redis,
//     limiter: Ratelimit.fixedWindow(1, "1440 m"),
//     analytics: true,
//   })
//   : undefined;

const handler = async (req, res) => {
  console.log('coming to analyse handler')
  const { imageUrl } = req.body

  // const body = await req.json()
  // const { imageUrl } = body
  console.log('imageUrl', imageUrl)

  // Check if user is logged in
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(500).json({ error: "Login to upload." });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    })
    console.log('**user', user)

    if (!user.isPro) {
      console.log('not pro')
      return res.status(500).json({ error: "NO_PRO_PLAN" });
    }

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
  } catch (err) {
    return res.status(500).json({ error: "An error occured while processing request." });
  }
};

export default handler;
