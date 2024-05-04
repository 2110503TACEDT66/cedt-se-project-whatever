'use client';
import {Rating, TextField } from '@mui/material';

export default function ShowOneFeedback({
  feedback,
}: {
  feedback: FeedbackItem;
}) {

  //console.log(bookingItem.reqType);

  return (
    <div className='bg-slate-200 flex flex-col w-full a rounded-lg p-4 mb-3 mt-2'>
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
