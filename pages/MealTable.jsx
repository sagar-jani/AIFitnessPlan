import React, { useState } from 'react'

function MealTable(props) {
  const { meals } = props

  console.log('meals', meals)
  const totals = meals?.reduce(
    (acc, meal) => {
      if (meal.foods && meal.foods.length > 0) {
        meal.foods.forEach((food) => {
          if (food?.protein) {
            acc.protein += parseInt(food?.protein)
          }
          if (food?.fat) {
            acc.fat += parseInt(food?.fat)
          }
          if (food?.carbs) {
            acc.carbs += parseInt(food?.carbs)
          }
          if (food?.calories) {
            acc.calories += parseInt(food?.calories)
          }
        })
      }
      return acc
    },
    { protein: 0, fat: 0, carbs: 0, calories: 0 }
  )

  console.log('totals', totals)

  const renderMeal = (meal) => {
    return meal.foods.map((food, i) => (
      <tr key={i}>
        <td className='border px-4 py-2'>{meal?.name}</td>
        <td className='border px-4 py-2'>{food?.name}</td>
        <td className='border px-4 py-2'>{food?.protein?.slice(0, -1)}</td>
        <td className='border px-4 py-2'>{food?.fat?.slice(0, -1)}</td>
        <td className='border px-4 py-2'>{food?.carbs?.slice(0, -1)}</td>
        <td className='border px-4 py-2'>{food?.calories}</td>
      </tr>
    ))
  }

  return (
    <>
      {meals && (
        <table className='mx-auto text-center text-lg font-outline text-white'>
          <thead>
            <tr className='text-primary'>
              <th className='px-4 py-2'>Meal</th>
              <th className='px-4 py-2'>Food Item</th>
              <th className='px-4 py-2'>Protein (gm)</th>
              <th className='px-4 py-2'>Fat (gm)</th>
              <th className='px-4 py-2'>Carbs (gm)</th>
              <th className='px-4 py-2'>Calories</th>
            </tr>
          </thead>
          <tfoot className='bg-primary text-white font-bold text-center'>
            <tr>
              <td></td>
              <td className='tex-2xl'>Overall calorie</td>
              <td className='tex-2xl'>{totals?.protein}</td>
              <td>{totals?.fat}</td>
              <td>{totals?.carbs}</td>
              <td>{totals?.calories}</td>
            </tr>
          </tfoot>
          <tbody className='font-outline'>
            {meals.map((meal, i) => renderMeal(meal))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default MealTable
