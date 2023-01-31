import React from 'react';

const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-screen-lg">
        <div className="bg-black shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-medium mb-4">Pricing</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-black rounded-lg p-8">
                <h3 className="text-lg font-medium">4 Weeks</h3>
                <p className="text-gray-600">$200</p>
                <p className="text-gray-600">2 sessions per week</p>
                <p className="text-gray-600">Customized workout plan</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-lg font-medium">8 Weeks</h3>
                <p className="text-gray-600">$360</p>
                <p className="text-gray-600">2 sessions per week</p>
                <p className="text-gray-600">Customized nutrition plan</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-lg font-medium">12 Weeks</h3>
                <p className="text-gray-600">$520</p>
                <p className="text-gray-600">2 sessions per week</p>
                <p className="text-gray-600">Monthly progress check-ins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
