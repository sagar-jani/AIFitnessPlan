import React from 'react';

const MealFormat = ({ mealPlan }) => {

  const mealPlanArray = JSON.parse(mealPlan);

  return (
    <div className="rounded-lg  shadow-md mt-20 text-white justify-center text-center">
      <table className="w-full mx-auto">
        <thead>
          <tr className="bg-gray-100 text-black text-center align-center uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Day</th>
            <th className="py-3 px-6 text-left">Meals</th>
          </tr>
        </thead>
        <tbody className=" font-light text-lg md:text-xl">
          {mealPlanArray.map((day) => (
            <tr key={day.Day}>
              <td className="py-3 px-6 text-left">{day.Day}</td>
              <td className="py-3 px-6 text-left">
                <ul>
                  {day.Meals.map((meal, index) => (
                    <li key={index}>
                      <div className="flex flex-row justify-between">
                        <div className='w-1/2 py-5 text-lg md:text-xl'>
                          <span className="font-bold text-primary">{Object.keys(meal)[0]}:</span>
                          <span className="ml-2">{Object.values(meal)[0]}</span>
                        </div>
                        <div className='flex flex-col items-start py-5'>
                          <span className="ml-2"> <span className="font-bold text-primary"> Carbs: </span> {meal.Carbs}</span>
                          <span className="ml-2"><span className="font-bold text-primary"> Protein: </span> {meal.Protein}</span>
                          <span className="ml-2"><span className="font-bold text-primary"> Fats: </span> {meal.Fats}</span>
                        </div>
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

export default MealFormat;
