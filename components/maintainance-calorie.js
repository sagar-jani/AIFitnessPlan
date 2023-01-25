import React from 'react'
const MaintainanceCalorie = (props) => {
  const { tdee, bmr } = props;
  return (
    <>
      <div className="text-center mb-5 mt-10">
        <p className="text-white text-5xl font-bold">Your Maintenance Calories</p>
      </div>

      <div className="flex flex-row mb-10 items-center justify-center ">

        <div className="mr-5 px-5 py-10 bg-white text-black  placeholder-sky-200 border border-gray-200 rounded-xl shadow-md text-5xl dark:bg-gray-800 dark:border-gray-700">
          {tdee.toLocaleString('en-US')}
        </div>

        <div className="w-1/2 px-11 py-5  placeholder-sky-200 border border-gray-200 rounded-xl shadow-md text-white text-md dark:bg-gray-800 dark:border-gray-700">
          Based on your stats, the best estimate for your maintenance calories is
          <span className='px-1 font-bold'>
            {tdee}
          </span>
          per day based on the Harris-Benedict, which is widely known to be the most accurate. The table below shows the difference if you were to have selected a different activity level.
        </div>
      </div>

    </>
  )
}
export default MaintainanceCalorie