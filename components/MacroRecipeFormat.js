import React from 'react';
const MacroRecipeFormat = ({ meals }) => {
  const recipes = meals && JSON.parse(meals);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="w-2/3  rounded overflow-hidden shadow-lg py-5 my-5  bg-blue text-white border"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2 md:text-4xl text-center">{recipe.RecipeName}</div>
            <div className=" text-base">
              <h2 className="text-lg font-bold mb-2 md:text-2xl">Instructions:</h2>
              <ul className="list-disc list-inside text-lg md:text-xl">
                {recipe.Instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <h2 className="text-lg font-bold my-2 md:text-2xl py-4">Ingredients:</h2>
              <ul className="list-disc list-inside text-lg md:text-xl">
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