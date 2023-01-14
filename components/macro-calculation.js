
import React, { useState } from 'react';
import Boxes from './Macro';


const MacroCalculation = (props) => {
  const [activeTab, setActiveTab] = useState('maintenance');
  const { tdee } = props
  return (
    <div className="text-center">
      <div className="text-center mb-5 mt-10">
        <p className="text-black text-2xl font-bold m-5">Macro Nutrients </p>
        {/* <div className='flex text-center  justify-center'>
          <p className='w-1/2'>Macronutrients are the nutrients we need in larger quantities that provide us with energy: in other words, fat, protein and carbohydrate.
          </p>
        </div> */}
      </div>
      <div className="flex justify-center mb-10">
        <button
          className={`px-4 py-2 font-medium border-b-4 border-transparent rounded-t-lg  hover:border-blue-500 ${activeTab === 'maintenance' ? 'border-blue-500' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          Maintenance
        </button>
        <button
          className={`px-4 py-2 font-medium  border-b-4 border-transparent rounded-t-lg hover:border-blue-500 ${activeTab === 'fatloss' ? 'border-blue-500' : ''}`}
          onClick={() => setActiveTab('fatloss')}
        >
          Fat Loss
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-4 border-transparent rounded-t-lg hover:border-blue-500 ${activeTab === 'musclebuilding' ? 'border-blue-500' : ''}`}
          onClick={() => setActiveTab('musclebuilding')}
        >
          Muscle Building
        </button>
      </div>
      {activeTab === 'maintenance' && (
        <>
          <p >These macronutrient values reflect your maintenance calories of {tdee.toLocaleString("en-US")} calories per day.
          </p>
          <Boxes tdee={tdee} />
        </>
      )}
      {activeTab === 'fatloss' && (
        <>
          <p>These macronutrient values reflect your cutting calories of {(tdee - 500).toLocaleString("en-US")} calories per day, which is a 500 calorie per day deficit from your maintenance of {tdee.toLocaleString("en-US")} calories per day.
          </p>
          <Boxes tdee={tdee - 500} />
        </>
      )}
      {activeTab === 'musclebuilding' && (
        <>
          <p>These macronutrient values reflect your bulking calories of {(tdee + 500).toLocaleString("en-US")} calories per day, which is +500 calories per day from your maintenance of {tdee.toLocaleString("en-US")} calories per day.
          </p>
          <Boxes tdee={tdee + 500} />
        </>
      )}
    </div>
  );
};

export default MacroCalculation;

