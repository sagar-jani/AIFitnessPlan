
import React, { useEffect, useState } from 'react';
import Boxes from './Macro';


const MacroCalculation = (props) => {
  const { tdee, activeTab, setActiveTab, dietType, setDietType } = props

  useEffect(() => {
    setActiveTab('maintenance')
  }, [])
  return (
    <div className="text-center border-2 mb-10 py-10" >
      <div className="text-center">
        <p className="text-white text-5xl font-bold m-5">Macro Nutrients </p>
        <div className='flex text-center  justify-center'>
          <p className='w-1/2 text-white'>Macronutrients are the nutrients we need in larger quantities that provide us with energy: in other words, fat, protein and carbohydrate.
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-10">
        <button
          className={` text-white px-4 py-2 font-medium border-b-4 border-transparent rounded-t-lg  hover:border-blue-500 ${activeTab === 'maintenance' ? 'border-blue-500' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          Maintenance
        </button>
        <button
          className={` text-white px-4 py-2 font-medium  border-b-4 border-transparent rounded-t-lg hover:border-blue-500 ${activeTab === 'fatloss' ? 'border-blue-500' : ''}`}
          onClick={() => setActiveTab('fatloss')}
        >
          Fat Loss
        </button>
        <button
          className={`text-white px-4 py-2 font-medium border-b-4 border-transparent rounded-t-lg hover:border-blue-500 ${activeTab === 'musclebuilding' ? 'border-blue-500' : ''}`}
          onClick={() => setActiveTab('musclebuilding')}
        >
          Muscle Building
        </button>
      </div>
      {activeTab === 'maintenance' && (
        <>
          <p className='text-white'>These macronutrient values reflect your maintenance calories of {tdee.toLocaleString("en-US")} calories per day.
          </p>
          <Boxes tdee={tdee} setDietType={setDietType} dietType={dietType} />
        </>
      )}
      {activeTab === 'fatloss' && (
        <>
          <p className='text-white'>These macronutrient values reflect your cutting calories of {(tdee - 500).toLocaleString("en-US")} calories per day, which is a 500 calorie per day deficit from your maintenance of {tdee.toLocaleString("en-US")} calories per day.
          </p>
          <Boxes tdee={tdee - 500} setDietType={setDietType} dietType={dietType} />
        </>
      )}
      {activeTab === 'musclebuilding' && (
        <>
          <p className='text-white'>These macronutrient values reflect your bulking calories of {(tdee + 500).toLocaleString("en-US")} calories per day, which is +500 calories per day from your maintenance of {tdee.toLocaleString("en-US")} calories per day.
          </p>
          <Boxes tdee={tdee + 500} setDietType={setDietType} dietType={dietType} />
        </>
      )}
    </div>
  );
};

export default MacroCalculation;

