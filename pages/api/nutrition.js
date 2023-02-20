const { OpenAIStream } = require("../../utils/OpenAIStream");

export const config = {
  runtime: "edge",
};

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export default async function handler(req) {
  console.log('req', req.body)
  const { protein, fat, carb, tdeeCalculated, dietPattern } = req.body;
  console.log(protein, fat, carb, tdeeCalculated, dietPattern)

  try {

    const prompt = `one-day diet for ${dietPattern} with exact ${Math.ceil(protein)} g protein, ${Math.ceil(fat)} g fat, and ${Math.ceil(carb)} g carbs & exact calorie ${Math.ceil(tdeeCalculated)} per day, 4 meals, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`

    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 3800,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } catch (e) {
    config.log('error')
    console.log({ e });
    return new Response(e, { status: 500 });
  }
}
