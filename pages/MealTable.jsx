import React from 'react'

function MealTable(props) {
  const { meals } = props
  console.log('meals', meals)

  const renderMeal = (meal) => {
    return meal.foods.map((food, i) => (
      <tr key={i}>
        <td className='border px-4 py-2'>{meal.name}</td>
        <td className='border px-4 py-2'>{food.name}</td>
        <td className='border px-4 py-2'>{food.protein}</td>
        <td className='border px-4 py-2'>{food.fat}</td>
        <td className='border px-4 py-2'>{food.carbs}</td>
        <td className='border px-4 py-2'>{food.calories}</td>
      </tr>
    ))
  }

  return (
    <table className='table-auto'>
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
      <tbody>{meals.map((meal, i) => renderMeal(meal))}</tbody>
    </table>
  )
}

export default MealTable
