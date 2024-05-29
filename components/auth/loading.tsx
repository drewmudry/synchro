// components/Loading.js
import React from 'react';
import Image from 'next/image';

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
      <div className="absolute opacity-0 animate-loading-950">
        <Image src="/lotus-teal-950.svg" alt="Loading" width={120} height={120} />
      </div>
      <div className="absolute opacity-0 animate-loading-900">
        <Image src="/lotus-teal-900.svg" alt="Loading" width={120} height={120} />
      </div>
      <div className="absolute opacity-0 animate-loading-800">
        <Image src="/lotus-teal-800.svg" alt="Loading" width={120} height={120} />
      </div>
      <div className="absolute opacity-0 animate-loading-700">
        <Image src="/lotus-teal-700.svg" alt="Loading" width={120} height={120} />
      </div>
      <div className="absolute opacity-0 animate-loading-600">
        <Image src="/lotus-teal-600.svg" alt="Loading" width={120} height={120} />
      </div>
      <div className="absolute opacity-0 animate-loading-500">
        <Image src="/lotus-teal-500.svg" alt="Loading" width={120} height={120} />
      </div>
      <div className="absolute opacity-0 animate-loading-400">
        <Image src="/lotus-teal-400.svg" alt="Loading" width={120} height={120} />
      </div>
    </div>
  );
};