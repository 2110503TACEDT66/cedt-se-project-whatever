'use client';
import {Rating, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import confirmStatusBooking from '@/libs/comfirmStatusBooking';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createBooking from '@/libs/createCureBooking';
import { DateTimePicker } from '@mui/x-date-pickers';
import ButtonStatus from './ButtonStatus';

export default function ShowOneFeedback({
  feedback,
}: {
  feedback: Feedback;
}) {

  //console.log(bookingItem.reqType);

  return (
    <div className='bg-slate-200 flex flex-col w-full a rounded-lg p-4'>
            <div className='font-bold text-xl text-black items-center flex gap-2'>
            {feedback.user.name}:
              <Rating
                name="simple-controlled"
                value={feedback.rating}
                readOnly
                className='text-center items-center'
              />
            </div>
            <div className='text-black text-lg pl-8 pt-6'>{feedback.comment}</div>
          </div>
  );
}
