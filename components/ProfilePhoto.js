
import { useSession, signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

const ProfilePhoto = () => {
  const { data: session, status } = useSession();

  return (<>
    {
      session?.user?.image ? (
        <Image
          alt="Profile picture"
          src={session?.user?.image}
          className="w-10 rounded-full"
          width={32}
          height={28}
        />
      ) : (
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="Vercel Icon"
            src="/images/vercelLogo.png"
            className="sm:w-10 sm:h-[34px] w-8 h-[28px]"
            width={32}
            height={28}
          />
        </a >
      )
    }
  </>)
}

export default ProfilePhoto;