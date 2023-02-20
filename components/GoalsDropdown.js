import React from "react";
import Dropdown from "./dropdown";

const GoalsDropdown = () => {
  const goalOptions = [
    { label: "Lose Fat", value: "Lose Fat" },
    { label: "Gain Muscles", value: "Gain Muscles" },
    { label: "Eat Healthy", value: "Eat Healthy" },
  ];

  return <Dropdown options={goalOptions} />
}

export default GoalsDropdown