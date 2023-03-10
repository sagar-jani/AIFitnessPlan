import React from 'react'
import AboutMe from './AboutMe'

import SocialIcons from './SocialIcons';
import { FaEnvelope } from 'react-icons/fa';
import MacroRecipe from './MacroRecipe';
import MacroCalculator from './MacroCalculator';
import Link from 'next/link';
import ProfilePhoto from './ProfilePhoto';

const Layout = ({ children }) => {
  return (
    <div className='bg-gradient '>
      <header className=' flex justify-center'>
        {/* <nav className=" mb-10 mt-10">
          <MacroCalculator />
        </nav> */}

        <nav className=" mb-10 mt-10">
          <AboutMe />
        </nav>
        <nav className="flex text-center ">
          <a href="mailto:sagar.aj@gmail.com"
            className="flex items-center m-2">
            <FaEnvelope className="text-gmail" size={30} />
          </a>
          <SocialIcons />
        </nav>
        <nav className="flex text-center mb-10 mt-10 ml-20">
          <ProfilePhoto />
        </nav>
      </header>
      <main className="bg-gradient">
        {children}
      </main>
      <footer className=' text-white font-bold text-xl flex justify-center p-4 mt-10 mb-5'>
        <div className='fixed bottom-0 right-0 mr-4 mb-5 font-bold text-xl'>
          <a
            target="_blank"
            href='https://twitter.com/sagarjani'
            className='right-0 bottom-0 mb-4 mr-4 font-mono text-white rounded-xl p-4'
            rel="noreferrer"
          >
            Made By @SagarJani
          </a>
        </div>
        <p>© 2023 AI Fitness Plan. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout