import React, { useState } from 'react';

const Boxes = (props) => {

  const { tdee, dietType, setDietType } = props
  const modCarbClassName = dietType === 'modCarb' ? ' bg-lime-100 ' : ' bg-peach '
  const lowCarbClassName = dietType === 'lowCarb' ? ' bg-lime-100 ' : ' bg-peach '
  const highCarbClassName = dietType === 'highCarb' ? ' bg-lime-100 ' : ' bg-peach '

  return (
    <div className='py-10'>
      <p className=' text-lg text-white'>
        Select any one plan below to generate a nutrition plan.
      </p>
      <div className={`grid md:grid-flow-col grid-rows-2 md:grid-rows-4 gap-3 md:gap-4 justify-center place-items-center mt-10`}>
        <button className='row-span-3' onClick={() => { setDietType('modCarb'); console.log('dietType', dietType) }}>
          <button className=" bg-primary text-white p-2 rounded-md text-xs"
            onClick={() => setDietType('modCarb')}>
            Moderate Carb (30/35/35)
          </button>

          {/* <div className={"box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center " + ((dietType === 'modCarb' ? "bg-blue-700 " : "bg-peach "))}> */}
          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${modCarbClassName}`}>
            {Math.ceil(tdee * 0.30 / 4)} g
            <div className="text-center">Protein</div>
          </div>

          {/* <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center"> */}
          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${modCarbClassName}`}>
            <div className="text-center">{Math.ceil(tdee * 0.35 / 9)} g</div>
            <div className="text-center">Fats</div>
          </div>

          {/* <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2"> */}
          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${modCarbClassName}`}>
            <div className="text-center">{Math.ceil(tdee * 0.35 / 4)} g</div>
            <div className="text-center">Carbs</div>
          </div>
        </button>

        <button className='row-span-3' onClick={() => setDietType('lowCarb')}>

          <button className=" bg-primary text-white p-2 rounded-md text-xs"
            onClick={() => setDietType('lowCarb')} >
            Lower Carb (40/40/20)
          </button>

          {/* <div className="box-border h-32 w-52 rounded-2xl bg-peach px-10 py-10 border-2 text-center"> */}
          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${lowCarbClassName}`}>
            {Math.ceil(tdee * 0.40 / 4)} g
            <div className="text-center">Protein</div>
          </div>

          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${lowCarbClassName}`}>
            <div className="text-center">{Math.ceil(tdee * 0.40 / 9)} g</div>
            <div className="text-center">Fats</div>
          </div>


          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${lowCarbClassName}`}>
            <div className="text-center">{Math.ceil(tdee * 0.20 / 4)} g</div>
            <div className="text-center">Carbs</div>
          </div>

        </button>

        <button className='row-span-3' onClick={() => setDietType('highCarb')}>
          <button className=" bg-primary text-white p-2 rounded-md text-xs" onClick={() => setDietType('highCarb')}>
            Higher Carb (30/20/50)
          </button>

          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${highCarbClassName}`}>
            {Math.ceil(tdee * 0.30 / 4)} g
            <div className="text-center">Protein</div>
          </div>

          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${highCarbClassName}`}>
            <div className="text-center">{Math.ceil(tdee * 0.20 / 9)} g</div>
            <div className="text-center">Fats</div>
          </div>

          <div className={` box-border h-32 w-52 rounded-2xl  px-10 py-10 border-2 text-center ${highCarbClassName}`}>
            <div className="text-center">{Math.ceil(tdee * 0.50 / 4)} g</div>
            <div className="text-center">Carbs</div>
          </div>
        </button>
      </div >

      <p className='text-white mt-10 text-lg md:text-xl'>There are <span className="text-blue-600"> 4 calories  </span> per gram for protein and carbohydrates, and <span className="text-blue-600"> 9 calories </span>  of fats.

      </p>
    </div >
  )

};

export default Boxes;
