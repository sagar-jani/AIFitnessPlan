export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const { prompt } = await req.json()

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  // const prompt = `Generate workout plan for ${workout} to perform at ${type}`
  console.log('prompt', prompt)

  const payload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = res.body;

  return new Response(data, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};

export default handler;