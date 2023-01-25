
const getResponse = (data) => {
  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;
  let tempState = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const newValue = decoder
      .decode(value)
      .replaceAll("data: ", "")
      .split("\n\n")
      .filter(Boolean);

    if (tempState) {
      newValue[0] = tempState + newValue[0];
      tempState = "";
    }

    newValue.forEach((newVal) => {
      if (newVal === "[DONE]") {
        return;
      }

      try {
        const json = JSON.parse(newVal)

        if (!json.choices?.length) {
          throw new Error("Something went wrong.");
        }

        const choice = json.choices[0];
        return (prev) => prev + choice.text;
        // setWorkoutPlan((prev) => prev + choice.text);
      } catch (error) {
        tempState = newVal;
        return tempState;
      }
    });
  }
}