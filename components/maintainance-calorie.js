import React from 'react'
const MaintainanceCalorie = (props) => {
  const { tdee, bmr } = props;
  return (
    <>
      <div className="text-center mb-5">
        <p className="text-white xs:text-3xl md:text-5xl font-bold">Your Maintenance Calories</p>
      </div>

      <div className="flex flex-col md:flex-row mb-10  items-center justify-center ">

        <div className="mr-5 mb-10 px:2 py-5 md:px-5 md:py-10 bg-white text-black  placeholder-sky-200 border border-gray-200 rounded-xl shadow-md text-5xl dark:bg-gray-800 dark:border-gray-700">
          {tdee.toLocaleString('en-US')}
        </div>

        <div className="w-full px-11 py-5 text-lg md:text-xl placeholder-sky-200 border border-gray-200 rounded-xl shadow-md text-white text-md dark:bg-gray-800 dark:border-gray-700">
          Based on your stats, the best estimate for your maintenance calories is <span className='px-1 font-bold text-blue-400'>{tdee}</span> per day based on the Harris-Benedict, which is widely known to be the most accurate.
          <br /><br />
          The table below shows the difference if you were to have selected a different activity level.
        </div>
      </div>
    </>
  )
}
export default MaintainanceCalorie