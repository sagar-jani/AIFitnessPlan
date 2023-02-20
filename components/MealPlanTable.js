import React from 'react';

const MealPlanTable = ({ mealPlan }) => {
  console.log('typeof mealPlan', typeof mealPlan);
  const mealPlanArray = JSON.parse(mealPlan);

  console.log('mealPlan1', mealPlan)
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mt-20">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Day</th>
            <th className="py-3 px-6 text-left">Meals</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {mealPlanArray.map((day) => (
            <tr key={day.Day}>
              <td className="py-3 px-6 text-left">{day.Day}</td>
              <td className="py-3 px-6 text-left">
                <ul>
                  {day.Meals.map((meal, index) => (
                    <li key={index}>
                      <div className="flex flex-row justify-between">
                        <span className="font-medium">{Object.keys(meal)[0]}:</span>
                        <span className="ml-2">{Object.values(meal)[0]}</span>
                        <span className="ml-2">Carbs: {meal.Carbs}</span>
                        <span className="ml-2">Protein: {meal.Protein}</span>
                        <span className="ml-2">Fats: {meal.Fats}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // <div className="p-4 text-white bg-pink">
    //   {mealPlanArray.map((day) => (
    //     <div className="my-4 text-white" key={day.Day}>
    //       <h2 className="text-xl font-bold mb-2">Day {day.Day}</h2>
    //       <ul>
    //         {day.Meals.map((meal) => (
    //           <li key={meal.Lunch || meal.Dinner} >
    //             <h3 className="text-3xl font-medium mb-2">
    //               {meal.Lunch ? "Lunch" : "Dinner"}
    //             </h3>
    //             <div className="flex justify-between">
    //               <div className="font-medium text-white">{meal.Lunch || meal.Dinner}</div>
    //               <div className="ml-4">{meal.Carbs} Carbs / {meal.Protein} Protein / {meal.Fats} Fats</div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>

  );
};

export default MealPlanTable;
