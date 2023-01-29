import React from 'react';
import { FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function SocialIcons() {
  return (
    <div className="flex flex-row">
      <a
        href="https://twitter.com/sagarjani"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center m-2 p-2 rounded-ful transition-colors duration-100 ease-in-out"
      >
        <FaTwitter aria-label="Twitter Icon" className="text-primary" size={30} />
      </a>
      <a
        href="https://www.instagram.com/fittrwithsagar/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center m-2  p-2 rounded-full  transition-colors duration-100 ease-in-out"
      >
        <FaInstagram aria-label="Instagram Icon" className="text-instagram" size={30} />
      </a>
    </div>
  );
}