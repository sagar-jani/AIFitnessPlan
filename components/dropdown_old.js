import Link from 'next/link';
import React, { use, useState } from 'react';

function DividerDropdown() {
  const [selectedOption, setSelectedOption] = useState('Strength Training 3X per week');
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <button
            className="dropdown-toggle inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => setVisible(!visible)}>
            Dropdown button
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512">
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">

              </path>
            </svg>
          </button>
          <ul
            className={`dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none bg-gray-800 ${visible ? 'hidden' : ''}`}
            aria-labelledby="dropdownMenuButton2">
            <li>
              <button
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600">
                Strength Training 3X per week
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('Strength Training 4X per week')}
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700">
                Strength Training 4X per week
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedOption('Strength Training 5X per week'); setVisible(false) }}
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700">
                Strength Training 5X per week
              </button>
            </li>
            <li><hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" /></li>
            <li>
              <button onClick={() => setSelectedOption('Strength Training 6X per week')}
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                href="#">
                Strength Training 6X per week
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DividerDropdown;
