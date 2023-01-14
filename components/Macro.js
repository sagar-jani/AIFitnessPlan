import React, { useState } from 'react';

const Boxes = (props) => {

  const { tdee } = props

  return (

    <div className='grid grid-flow-col grid-rows-3 gap-4 justify-center mt-10 ml-60'>
      <div className='col-span-1'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4 text-center">
          {Math.ceil(tdee * 0.30 / 4)} g
          <div className="text-center">Protein</div>

        </div>
      </div>

      <div className='col-span-1 justify-center'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4 text-center">
          <div className="text-center">{Math.ceil(tdee * 0.35 / 9)} g</div>
          <div className="text-center">Fats</div>
        </div>
      </div>
      <div className='col-span-1'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4">
          <div className="text-center">{Math.ceil(tdee * 0.35 / 4)} g</div>
          <div className="text-center">Carbs</div>
        </div>
      </div>



      <div className='col-span-1'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4 text-center">
          {Math.ceil(tdee * 0.40 / 4)} g
          <div className="text-center">Protein</div>

        </div>
      </div>

      <div className='col-span-1 justify-center'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4 text-center">
          <div className="text-center">{Math.ceil(tdee * 0.40 / 9)} g</div>
          <div className="text-center">Fats</div>
        </div>
      </div>
      <div className='col-span-1'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4">
          <div className="text-center">{Math.ceil(tdee * 0.20 / 4)} g</div>
          <div className="text-center">Carbs</div>
        </div>
      </div>



      <div className='col-span-1'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4 text-center">
          {Math.ceil(tdee * 0.30 / 4)} g
          <div className="text-center">Protein</div>

        </div>
      </div>

      <div className='col-span-1 justify-center'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 text-center">
          <div className="text-center">{Math.ceil(tdee * 0.20 / 9)} g</div>
          <div className="text-center">Fats</div>
        </div>
      </div>
      <div className='col-span-1'>
        <div className="box-border h-32 w-60 rounded-2xl bg-peach px-10 py-10 border-4">
          <div className="text-center">{Math.ceil(tdee * 0.50 / 4)} g</div>
          <div className="text-center">Carbs</div>
        </div>
      </div>
    </div>





  )

  // return (
  //   <div className="flex flex-col">
  //     <div className="relative">
  //       <div className="bg-white p-5 rounded-md border border-gray-400">
  //         <div className="relative bg-white p-5 rounded-md">
  //           <div className="absolute top-0 left-0 bg-blue-500 text-white p-2 rounded-md">
  //             Moderate Carb (30/35/35)
  //           </div>
  //         </div>
  //         <div className="text-center">222g</div>
  //         <div className="text-center">Protein</div>
  //       </div>
  //       <hr className="w-full my-2 border-gray-400 border-t-2" />
  //     </div>
  //     <div className="relative">
  //       <div className="bg-white p-5 rounded-md border border-gray-400">
  //         <div className="text-center">222g</div>
  //         <div className="text-center">Protein</div>
  //       </div>
  //       <hr className="w-full my-2 border-gray-400 border-t-2" />
  //     </div>
  //     <div className="relative">
  //       <div className="bg-white p-5 rounded-md border border-gray-400">
  //         <div className="text-center">222g</div>
  //         <div className="text-center">Protein</div>
  //       </div>
  //     </div>
  //   </div>
  // )
};

export default Boxes;
