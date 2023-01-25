const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

module.exports.hello = async (event) => {

  const eventBody = JSON.parse(event.body);
  const { prompt } = eventBody;


  // const planPrompt = `one-day diet with exact ${protein} g protein, ${fat} g fat, and ${carb} g carbs & exact calorie ${calorie} per day, 4 meals, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs )`

  // prompt: "one-day diet with exact 231 g protein, 120 g fat, and 269 g carbs & exact calorie 2570 per day,  4 meals to build muscle, give calorie & macro details for each food and overall meal, food item format should be like Oatmeal - 1 cup (150 calories, 5g protein, 2.5g fat, 27g carbs ) like Chris Gethin",
  try {
    const response = await openai.createCompletion({
      // prompt: "Accurate 2570 calories diet chart with 231 g protein 120 g fat 269 g carbs divided 4 meals, mention calorie & macro details for each food item, and divide protein equally across all meals",
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 3890,
      top_p: 0.7,
      best_of: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log('response.data', response.data.choices[0].text)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        plan: response.data.choices[0].text
      })
    };
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
