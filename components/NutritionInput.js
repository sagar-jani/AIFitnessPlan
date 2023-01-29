import React, { useState } from 'react';

function NutritionInput(props) {

  const { dietPattern, setDietPattern, cuisine, setCuisine } = props;

  // const [dietPattern, setDietPattern] = useState('Vegetarian');
  // const [cuisine, setCuisine] = useState('Italian');

  return (
    <div className="border rounded-lg p-3 mx-auto text-center text-white font-medium text-lg">
      <h2 className="text-5xl font-black">Nutrition</h2>
      <div className='md:grid  grid-cols-2 gap-10'>
        <div className="my-2">
          <h3 className="text-3xl font-black text-primary">Diet Type</h3>
          <div className="flex justify-center my-2">
            <input
              type="radio"
              id="Vegetarian"
              name="dietType"
              value="Vegetarian"
              checked={dietPattern === 'Vegetarian'}
              onChange={e => setDietPattern(e.target.value)}
              // className="mr-2"
              className="pl-2"
            />
            <label htmlFor="Vegetarian" className="pl-2">Vegetarian</label>
          </div>
          <div className="flex justify-center">
            <input
              type="radio"
              id="Veg+Eggs"
              name="dietType"
              value="Veg+Eggs"
              checked={dietPattern === 'Veg+Eggs'}
              onChange={e => setDietPattern(e.target.value)}
              // className="mr-2"
              className="pl-2"
            />
            <label htmlFor="Veg+Eggs" className="pl-2">Veg + Eggs</label>
          </div>
          <div className="flex justify-center">
            <input
              type="radio"
              id="Non-Vegetarian"
              name="dietType"
              value="Non-Vegetarian"
              checked={dietPattern === 'Non-Vegetarian'}
              onChange={e => setDietPattern(e.target.value)}
              // className="mr-2"
              className="pl-2"
            />
            <label htmlFor="Non-Vegetarian" className="pl-2">Non-Vegetarian</label>
          </div>
          <div className="flex justify-center">
            <input
              type="radio"
              id="Vegan"
              name="dietType"
              value="Vegan"
              checked={dietPattern === 'Vegan'}
              onChange={e => setDietPattern(e.target.value)}
              // className="mr-2"
              className="pl-2"
            />
            <label htmlFor="Vegan" className="pl-2">Vegan</label>
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-3xl font-black text-primary">Cuisine</h3>
          <div className="my-2">
            <input
              type="radio"
              id="Italian"
              name="cuisine"
              value="Italian"
              checked={cuisine === 'Italian'}
              onChange={e => setCuisine(e.target.value)}

              className="pl-2"
            />
            <label htmlFor="Italian" className="pl-2">Italian</label>
          </div>
          <div className="my-2">
            <input
              type="radio"
              id="Japanese"
              name="cuisine"
              value="Japanese"
              checked={cuisine === 'Japanese'}
              onChange={e => setCuisine(e.target.value)}
              // className="mr-2"
              className="pl-2"
            />
            <label htmlFor="Japanese" className="pl-2">Japanese</label>
          </div>
          <div className="my-2">
            <input
              type="radio"
              id="Mediterranean"
              name="cuisine"
              value="Mediterranean"
              checked={cuisine === 'Mediterranean'}
              onChange={e => setCuisine(e.target.value)}
              // className="mr-2"
              className="pl-2"
            />
            <label htmlFor="Mediterranean" className="pl-2">Mediterranean</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionInput;
