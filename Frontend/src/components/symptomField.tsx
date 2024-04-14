'use client';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { changeSymptom } from '@/redux/features/dateSlice';
import { TextField } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function SymptomField({
  dentist,
  onCreateBooking,
}: {
  dentist: string;
  onCreateBooking: Function;
}) {
  const date = useAppSelector((state) => {
    return state.dateSlice.bookdate.date;
  });
  const symptom = useAppSelector((state) => {
    return state.dateSlice.bookdate.symptom;
  });
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();
  if (!session || !session.user.token) return null;

  function getDateString(date: string): string {
    return new Date(date).toISOString();
  }

  function addOneHour(date: string): string {
    const oneHour = 60 * 60 * 1000;
    let dateObject = new Date(date);
    dateObject.setTime(dateObject.getTime() + oneHour);
    return dateObject.toISOString();
  }

  return (
    <div>
      <TextField
        variant="standard"
        type="text"
        name="symptom"
        label="Symptom"
        className="rounded mt-3 ring-2 ring-inset ring-grey-400 text-md leading-6 indent-2 placeholder:text-grey-400"
        onChange={(e) => {
          dispatch(changeSymptom(e.target.value));
        }}
      />
      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            shadow-sm text-white my-5"
        onClick={() => {
          if (!symptom) alert('Please type in your symptom');
          else
            onCreateBooking(
              session.user.token,
              session?.user._id,
              dentist,
              date,
              addOneHour(date),
              symptom
            );
        }}>
        Book
      </button>
    </div>
  );
}
