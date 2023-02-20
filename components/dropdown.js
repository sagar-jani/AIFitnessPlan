import React from "react";
import { useState } from "react";



function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  console.log('options', options)
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className="mx-auto text-center items-center justify-center">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span>{selectedOption ? selectedOption.label : "Choose a goal"}</span>
          <svg
            className={`w-5 h-5 ml-2 ${isOpen ? "-rotate-180" : ""
              } transition-transform duration-200`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-56 rounded-md shadow-lg bg-white" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option.value}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${option.value}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
