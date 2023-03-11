import React from 'react';
const MacroRecipeFormat = ({ meals }) => {
  console.log('meals inside MacroRecipeFormat', meals)
  const recipe = meals && JSON.parse(meals);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {
        <div className="w-full rounded overflow-hidden shadow-lg py-5 my-5  bg-blue text-white border">
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2 md:text-4xl text-center text-primary py-2" >{recipe.RecipeName}</div>
            <div className=" text-base py-2">
              <h2 className="text-lg font-bold mb-2 md:text-2xl py-2"><span className='text-primary'> Difficulty: </span> <span className='text-lg md:text-xl'> {recipe.Difficulty} </span></h2>
              <h2 className="text-lg font-bold mb-2 md:text-2xl text-primary py-2">  Kitchen Tools: </h2>
              <ul className="list-disc list-inside text-lg md:text-xl py-2">
                {recipe.KitchenTools.map(tool => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <h2 className="text-lg font-bold mb-2 md:text-2xl text-primary py-2">Instructions:</h2>

              <ul className="list-disc list-inside text-lg md:text-xl py-2">

                {recipe.Instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <h2 className="text-lg font-bold my-2 md:text-2xl py-4 text-primary">Ingredients:</h2>
              <ul className="list-disc list-inside text-lg md:text-xl py-2">
                {recipe.Ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      }
      )
    </div>
  )
}

export default MacroRecipeFormat;