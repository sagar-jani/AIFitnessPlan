import React from "react";
import Image from "next/image";

export default function ClientTransformations() {
  return (
    <>
      <h2 className="text-5xl font-bold text-center mt-10 mb-4">Client Transformations</h2>
      <div className="sm:grid sm:gap-y-12 sm:grid-cols-3 sm:gap-x-8">
        <div>
          <Image
            src='/images/client-1-front-1.png'
            alt='Picture of client 1'
            width={800}
            height={800}
          />
        </div>
        <div>
          <Image
            src='/images/client-1-side-1.png'
            alt='Picture of client 2'
            width={800}
            height={800}
          />
        </div>
        <div>
          <Image
            src='/images/client-1-back-1.png'
            alt='Picture of client 2'
            width={800}
            height={800}
          />
        </div>
      </div>
    </>
  )
}