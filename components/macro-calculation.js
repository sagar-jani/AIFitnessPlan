
import React, { useState } from 'react';
import Boxes from './Macro';


const MacroCalculation = (props) => {
  const [activeTab, setActiveTab] = useState('maintenance');
  const { tdee } = props
  return (
    <div className="text-center">
      <div className="flex justify-center">
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
        <div className='justify-center items-center content-center'>
          <Boxes tdee={tdee} />
        </div>
      )}
      {activeTab === 'fatloss' && (
        <div className='justify-center items-center content-center'>
          <Boxes tdee={tdee - 500} />
        </div>
      )}
      {activeTab === 'musclebuilding' && (
        <div className='justify-center items-center content-center'>
          <Boxes tdee={tdee + 500} />
        </div>
      )}
    </div>
  );
};

export default MacroCalculation;

