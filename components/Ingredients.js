import React from 'react';

const Ingredients = ({ ingredients }) => {
  return (
    <div style={{ margin: '1rem', textAlign: 'center' }}>
      <ul style={{ listStyleType: 'none' }}>
        {ingredients.map((ingredient, index) => (
          <li key={index} style={{ padding: '0.5rem', fontWeight: '500' }}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredients;