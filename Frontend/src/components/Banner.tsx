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
    <div className="flex-col p-[5px] m-0 w-screen h-[100vh] relative items-center text-center">
      <div className="relative top-24 z-20 text-center">
        <div className='p-4 inline-block rounded-lg bg-slate-100/50'>
        <h1 className="text-6xl p-4 rounded-lg font-semibold font-body text-cyan-800">Welcome to Dentist Booking</h1>
        <div className="text-xl font-serif italic text-cyan-900 mt-6">Your perfect choice for dentist booking</div>
        <div className='flex mt-10 items-center justify-center'>
        {session?.user.role == "receptionist" ? null : 
        <Link href="/dentists" style={{textDecoration:'none', fontSize:'20px'}} className='flex items-center h-12 border-2 rounded-lg border-cyan-500 w-28 shadow-lg
        justify-center bg-cyan-500 text-white hover:bg-cyan-600 hover:border-cyan-600 w-36 transition ease-in-out
        delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
            <div className='text-2xl '>
              Book Now
            </div>
          </Link>}
        </div>
      </div>

      </div>
    </div>
  );
}
