import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Header({ photo }) {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (

    <header className="flex flex-row xs:flex-row items-center w-full mt-3 border-b pb-7 sm:px-4 px-2  py-5 border-gray-500 gap-2 text-white bg-g">
      {session !== null && session?.user !== null &&
        (<div className="flex items-center lg:hidden">
          <button
            className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                className={`${isNavOpen ? 'hidden' : 'inline-flex'}`}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
              <path
                className={`${isNavOpen ? 'inline-flex' : 'hidden'}`}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 5h15v2h-15V5zm0 5h15v2h-15v-2zm0 5h15v2h-15v-2z"
              />
            </svg>
          </button>
          {isNavOpen && (
            <div className={`absolute top-28 z-50 inset-x-0 p-2 transition transform origin-top-right ${isNavOpen ? '' : 'hidden'}`}>
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 flex flex-col">
                <a href="/" className="px-4 py-2 inline-flex text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                  </svg>
                  Home
                </a>

                <a href="/plan" className="px-4 py-2 inline-flex text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                  <svg className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Check Your Stats</a>
                <a href="/mealplan" className="px-4 py-2 inline-flex text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                  <svg className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Nutrition Plan
                </a>
                <a href="/workout" className="px-4 py-2 inline-flex text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                  <svg className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Exercise Plan
                </a>
                <a href="/macro" className="px-4 py-2 text-sm  inline-flex font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                  <svg className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Plan your meal</a>
                <a href="/analyse" className="px-4 py-2 inline-flex text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                  <svg className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Check your form</a>
              </div>
            </div>
          )}
        </div>)}


      <Link href="/" className="flex space-x-2">
        <h1 className="sm:text-3xl justify-start text-xl font-bold ml-2 tracking-tight ">
          AI Fitness Planner
        </h1>
      </Link>
      {/* TODO: Eventually add a dropdown where folks can click to logout and buy credits */}
      {/* TODO: Maybe add another link to purchase credits next to dashboard */}
      {/* TODO: Also add "see previous generations in our new dashboard" note */}
      <div className="flex flex-1 justify-end space-x-6 items-center">

        <Link href='/pricing' className="text-md sm:text-2xl font-medium text-primary hover:text-gray-400">Pricing</Link>
        {photo ? (
          // <div className="flex items-center space-x-4 ">
          <Image
            alt="Profile picture"
            src={photo}
            className="w-10 rounded-full"
            width={32}
            height={28}
          />
          // </div>
        ) : (
          // <div className="flex items-center space-x-4 sm:text-3xl text-xl font-bold ml-2 tracking-tight text-blue-600">
          <button
            onClick={() => signIn("google")}
            className="bg-gray-200 text-black font-semibold md:py-2 md:px-4 rounded-2xl flex items-center space-x-2 xs:py-0 xs:px-2 sm:rounded-2xl"
          >
            <Image
              src="/images/google.png"
              width={20}
              height={20}
              alt="google's logo"
            />
            <span className="xs:text-md md:text-xl">Login</span>
          </button>
          // </div>
        )}
      </div>

    </header>
  );
}
