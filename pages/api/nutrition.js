export const config = {
  runtime: "edge",
};

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const handler = async (req, res) => {
  const body = await req.json()
  console.log('body', body)

  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(500).json("Login to upload.");
  // }

  const { goal, days, dietType } = req.body;
  const prompt = `Task: Analyse according to the instructions in my text. My Text: Create a protein-rich meal plan by strictly following these rules: 1- Goal: ${goal} 2- Diet Requirement: ${dietType}  3- For how many Days: ${days}  4- Make sure to include meals for lunch and dinner with macr count Output: ONLY MARKDOWN JSON. JSON Format example: [ {"Day": number,  "Meals": [{"Lunch": string, "Carbs": number, "Protein": number, "Fats": number}, {"Dinner": string, "Carbs": number, "Protein": number, "Fats": number}]}] `

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
      meal: result,
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