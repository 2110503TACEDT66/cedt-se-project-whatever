'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="flex flex-col p-[5px] m-0 w-screen h-[100vh] relative items-center text-center">
      <div className="relative top-[100px] z-20 text-center">
        <h1 className="text-6xl font-serif text-cyan-600">Welcome to Dentist Booking</h1>
        <h3 className="text-2xl font-serif text-black mt-6">Get your easiest way to meet the dentist here !!</h3>
        <div className='flex mt-10 items-center justify-center'>
        <Link href="/dentists" style={{textDecoration:'none', fontSize:'20px'}} className='flex items-center h-12 border-2 rounded-lg border-cyan-600 w-auto shadow-lg
        justify-center hover:text-cyan-600 bg-cyan-600 text-white hover:bg-white w-36'>
            <div className='text-2xl'>
              Book Now
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
