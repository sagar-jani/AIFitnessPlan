import React from 'react'

function MealTable(props) {
  const { meals } = props
  console.log('meals', meals)

  const renderMeal = (meal) => {
    return meal.foods.map((food, i) => (
      <tr key={i}>
        <td className='border px-4 py-2'>{meal.name}</td>
        <td className='border px-4 py-2'>{food.name}</td>
        <td className='border px-4 py-2'>{food.protein.slice(0, -1)}</td>
        <td className='border px-4 py-2'>{food.fat.slice(0, -1)}</td>
        <td className='border px-4 py-2'>{food.carbs.slice(0, -1)}</td>
        <td className='border px-4 py-2'>{food.calories}</td>
      </tr>
    ))
  }

  return (
    <table className='mx-auto text-center'>
      <thead>
        <tr>
          <th className='px-4 py-2'>Meal</th>
          <th className='px-4 py-2'>Food Item</th>
          <th className='px-4 py-2'>Protein (gm)</th>
          <th className='px-4 py-2'>Fat (gm)</th>
          <th className='px-4 py-2'>Carbs (gm)</th>
          <th className='px-4 py-2'>Calories</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td></td>
          <td>Overall calorie</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
      <tbody>{meals.map((meal, i) => renderMeal(meal))}</tbody>
    </table>
  )
}

export default MealTable
