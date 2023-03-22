import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header({ photo }) {
  return (

    <header className="flex xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 py-5 border-gray-500 gap-2 text-white bg-g">
      <Link href="/" className="flex space-x-2">
        {/* <Image
          alt="header text"
          src="/bed.svg"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        /> */}
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight ">
          AI Fitness Planner
        </h1>
      </Link>
      {/* TODO: Eventually add a dropdown where folks can click to logout and buy credits */}
      {/* TODO: Maybe add another link to purchase credits next to dashboard */}
      {/* TODO: Also add "see previous generations in our new dashboard" note */}
      {photo ? (
        <div className="flex items-center space-x-4 ">
          <Image
            alt="Profile picture"
            src={photo}
            className="w-10 rounded-full"
            width={32}
            height={28}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-4 sm:text-3xl text-xl font-bold ml-2 tracking-tight text-blue-600">
          <button
            onClick={() => signIn("google")}
            className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-2xl flex items-center space-x-2"
          >
            <Image
              src="/images/google.png"
              width={30}
              height={30}
              alt="google's logo"
            />
            <span>Login</span>
          </button>
        </div>
      )}
      {/* <div>
        <Link href='/pricing' className="px-4 py-2 justify-end text-xl font-medium text-primary hover:text-gray-400">Pricing</Link>
      </div> */}
    </header>
  );
}
