// pages/layout.js
import React from 'react'
import AboutMe from './AboutMe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SocialIcons from './SocialIcons';
import { FaEnvelope } from 'react-icons/fa';
import GmailIcon from '../styles/Gmail';
// import { fab } from '@fortawesome/free-brands-svg-icons';



// const Layout = ({ children }) => {
//   return (
//     <div className="bg-gradient">
//       {children}
//     </div>
//   )
// }

const Layout = ({ children }) => {
  return (
    <div>
      <header className='flex'>
        <nav className=" mb-10 mt-10">
          <AboutMe />
        </nav>
        <nav className="flex text-right justify-end">
          <a href="mailto:sagar.aj@gmail.com"
            className="flex items-center m-2">
            <FaEnvelope className="text-gmail" size={30} />
            <p className="ml-2">
              Email
            </p>
          </a>
          <SocialIcons />
        </nav>
      </header>
      <main className="bg-gradient">
        {children}
      </main>
    </div>
  )
}

export default Layout
