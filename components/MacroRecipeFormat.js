import React from 'react';
const MacroRecipeFormat = ({ meals }) => {
  const recipes = meals && JSON.parse(meals);

  return (
    <div className="flex flex-col items-center justify-center">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="max-w-lg rounded overflow-hidden shadow-lg my-4 mx-2 bg-white"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{recipe.mealName}</div>
            <div className="text-gray-700 text-base">
              <h2 className="text-lg font-medium mb-2">Instructions:</h2>
              <ul className="list-disc list-inside">
                {recipe.Instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <h2 className="text-lg font-medium my-2">Ingredients:</h2>
              <ul className="list-disc list-inside">
                {recipe.Ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
    // <div className="bg-white rounded-lg overflow-hidden shadow-md mt-20">
    //   <table className="w-full">
    //     <thead>
    //       <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
    //         <th className="py-3 px-6 text-left">Day</th>
    //         <th className="py-3 px-6 text-left">Meals</th>
    //       </tr>
    //     </thead>
    //     <tbody className="text-gray-600 text-sm font-light">
    //       {mealPlanArray.map((day) => (
    //         <tr key={day.Day}>
    //           <td className="py-3 px-6 text-left">{day.Day}</td>
    //           <td className="py-3 px-6 text-left">
    //             <ul>
    //               {day.Meals.map((meal, index) => (
    //                 <li key={index}>
    //                   <div className="flex flex-row justify-between">
    //                     <span className="font-medium">{Object.keys(meal)[0]}:</span>
    //                     <span className="ml-2">{Object.values(meal)[0]}</span>
    //                     <span className="ml-2">Carbs: {meal.Carbs}</span>
    //                     <span className="ml-2">Protein: {meal.Protein}</span>
    //                     <span className="ml-2">Fats: {meal.Fats}</span>
    //                   </div>
    //                 </li>
    //               ))}
    //             </ul>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default MacroRecipeFormat;