const handler = async (req, res) => {
  const { prompt } = req.body

  console.log('prompt', prompt)
  const BASE_URL = 'https://9585g9ydqf.execute-api.us-east-1.amazonaws.com/dev/'
  try {
    const response = await fetch(`${BASE_URL}/diet-planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt
      }),
    })


    const data = await response.json()
    console.log('data', data)
    // res.status(200).json({ plan: data.plan })
    res.end(JSON.stringify(data));

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({ message: 'An error occured !' })
  }
}

export default handler;