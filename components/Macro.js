import React, { useState } from 'react';

const Boxes = (props) => {

  const { tdee } = props

  return (
    <div>
      <div className='grid grid-flow-col grid-rows-4 gap-4 justify-center place-items-center mb-10'>
        <div className=" bg-blue-500 text-white p-2 rounded-md text-xs -mb-32">
          Moderate Carb (30/35/35)
        </div>

        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center">
          {Math.ceil(tdee * 0.30 / 4)} g
          <div className="text-center">Protein</div>
        </div>

        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center">
          <div className="text-center">{Math.ceil(tdee * 0.35 / 9)} g</div>
          <div className="text-center">Fats</div>
        </div>

        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2">
          <div className="text-center">{Math.ceil(tdee * 0.35 / 4)} g</div>
          <div className="text-center">Carbs</div>
        </div>

        <div className=" bg-blue-500 text-white p-2 rounded-md text-xs -mb-32">
          Lower Carb (40/40/20)
        </div>

        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center">
          {Math.ceil(tdee * 0.40 / 4)} g
          <div className="text-center">Protein</div>
        </div>



        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center">
          <div className="text-center">{Math.ceil(tdee * 0.40 / 9)} g</div>
          <div className="text-center">Fats</div>
        </div>


        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2">
          <div className="text-center">{Math.ceil(tdee * 0.20 / 4)} g</div>
          <div className="text-center">Carbs</div>
        </div>


        <div className=" bg-blue-500 text-white p-2 rounded-md text-xs -mb-32">
          Higher Carb (30/20/50)
        </div>

        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center">
          {Math.ceil(tdee * 0.30 / 4)} g
          <div className="text-center">Protein</div>

        </div>


        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 text-center border-2">
          <div className="text-center">{Math.ceil(tdee * 0.20 / 9)} g</div>
          <div className="text-center">Fats</div>
        </div>


        <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2">
          <div className="text-center">{Math.ceil(tdee * 0.50 / 4)} g</div>
          <div className="text-center">Carbs</div>
        </div>
      </div>
      <p>There are 4 calories per gram of both protein and carbohydrates, and 9 calories per gram of fats.

      </p>
    </div>
  )

};

export default Boxes;
