import React from 'react';
import Image from 'next/image';

export default function Name() {
  return (
    <div className="flex flex-wrap mt-8">
      <div className="w-1/2">
        <Image
          src="https://randomuser.me/api/portraits/women/27.jpg"
          className="mx-auto rounded-full"
          height={80}
          width={80}
          alt="sample image"
        />
      </div>
      <div className="w-1/2">
        <span className="font-semibold text-white">Ava Harper</span>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md border border-blue-500 hover:bg-white hover:text-green-500">
          Premium
        </button>
      </div>
    </div>
  )
};
