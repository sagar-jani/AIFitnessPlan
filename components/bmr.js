import React from 'react'
const BMR = (props) => {
  const { bmr } = props
  return (
    <>
      <div className="text-center mb-5 mt-10">
        <p className="text-white text-5xl font-bold">BMR</p>
      </div>
      <div className="flex flex-row mb-10 items-center justify-center text-white">

        <div className='grid grid-cols-2 divide-y gap-x-5 md:gap-x-20 gap-y-2 text-md md:text-lg'>

          <div className='col-span-1 row-span-1 '>
            Basal Metabolic Rate
          </div>

          <div className='col-span-1 row-span-1'>
            {Math.ceil(bmr).toLocaleString('en-US')} calories per day
          </div>

          <div className='col-span-1 row-span-1'>
            Sedentary
          </div>

          <div className='col-span-1 row-span-1'>
            {Math.ceil(bmr * 1.2).toLocaleString('en-US')} calories per day
          </div>

          <div className='col-span-1 row-span-1'>
            Light Exercise
          </div>

          <div className='col-span-1 row-span-1'>
            {Math.ceil(bmr * 1.375).toLocaleString('en-US')} calories per day
          </div>

          <div className='col-span-1 row-span-1'>
            Moderate Exercise
          </div>

          <div className='col-span-1 row-span-1'>
            {Math.ceil(bmr * 1.55).toLocaleString('en-US')} calories per day
          </div>

          <div className='col-span-1 row-span-1'>
            Heavy Exercise
          </div>

          <div className='col-span-1 row-span-1'>
            {Math.ceil(bmr * 1.725).toLocaleString('en-US')} calories per day
          </div>

          <div className='col-span-1 row-span-1'>
            Athlete
          </div>

          <div className='col-span-1 row-span-1'>
            {Math.ceil(bmr * 1.9).toLocaleString('en-US')} calories per day
          </div>


        </div>

      </div>
    </>
  )
}
export default BMR;