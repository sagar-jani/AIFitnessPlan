import React from "react";
import Dropdown from "./dropdown";

const DietTypeDropDown = () => {
  const dietOptions = [
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'No Dietary Restrictions', value: 'No Dietary Restrictions' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Dairy-Free', value: 'Dairy-Free' },
    { label: 'Gluten-Free', value: 'Gluten-Free' },
  ];

  return <Dropdown options={dietOptions} />
}

export default DietTypeDropDown