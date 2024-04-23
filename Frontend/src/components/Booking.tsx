'use client';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { createContext, useContext, useState } from 'react';
import Link from 'next/link';
import CircleIcon from '@mui/icons-material/Circle';
import ButtonStatus from './ButtonStatus';
import PopupCommentNRating from './PopupCommentNRating';

type ContextValueType = {
  popUpBoolean: boolean;
  setPopUpBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Context = createContext<ContextValueType | undefined>(undefined);

export default function Booking({
  bookingItem,
  onDeleteBooking,
  onUpdateBooking,
}: {
  bookingItem: BookingItem;
  onDeleteBooking: Function;
  onUpdateBooking: Function;
}) {
  const { data: session } = useSession();
  if (!session || !session.user.token) return null;

  const [editing, setEditing] = useState<boolean>(false);
  const [newSymptom, setNewSymptom] = useState<String | null>(null);
  const [popUpBoolean, setPopUpBoolean] = useState(false)
  const contextValue: ContextValueType = {
    popUpBoolean,
    setPopUpBoolean,
  };

  return (
    <div className='flex flex-col bg-slate-100 rounded-lg mx-4'>
      <div className="px-5 pt-2 flex flex-row text-black">
        <Image
          src={bookingItem.dentist.picture}
          alt="dentist"
          width={0}
          height={0}
          sizes="100vh"
          className="h-36 w-auto object-cover mr-4 my-4 rounded-lg"></Image>
        <div className='my-4'>
          <div>
            <span className="text-lg font-semibold font-body  text-cyan-900">Patient: </span>
            <span className="text-lg">{bookingItem.user.name}</span>
          </div>
          <div>
            <span className="text-lg font-semibold font-body  text-cyan-900">Dentist: </span>
            <span className="text-lg">{bookingItem.dentist.name}</span>
          </div>
          <div>
            <span className="text-lg font-semibold font-body  text-cyan-900">Booking date: </span>
            <span className="text-lg">{new Date(bookingItem.startDate).toUTCString()}</span>
            <span className="text-lg">{' - '}</span>
            <span className="text-lg">{new Date(bookingItem.endDate).toUTCString()}</span>
          </div>
          <div>
            <span className="text-lg font-semibold font-body text-cyan-900">Symptom: </span>
            <span className="text-lg">{bookingItem.symptom}</span>
          </div>
          <div >
            <span className="text-lg font-semibold font-body  text-cyan-900">Status: </span>
            <span className="text-lg italic">{bookingItem.status} </span>
            <ButtonStatus status={bookingItem.status} />
          </div>
        </div>
      </div>
      <div className='px-2 pb-4 flex flex-row'>
      {editing ? (
            <div className="flex flex-row gap-x-3 py-2 ml-4">
              <TextField
                variant="standard"
                placeholder="symptom"
                onChange={(e) => {
                  setNewSymptom(e.target.value);
                }}
              />
              <button
                className="block rounded-md bg-red-600 hover:bg-red-700 transition px-3 py-2 shadow-sm text-white mx-3"
                onClick={() => setEditing(!editing)}>
                Cancel Editing
              </button>
              <button
                className="block rounded-md bg-green-600 hover:bg-green-700 transition px-3 py-2 shadow-sm text-white mx-3"
                onClick={() => {
                  setEditing(!editing);
                  onUpdateBooking(
                    bookingItem._id,
                    newSymptom,
                    session.user.token
                  );
                }}>
                Confirm Editing
              </button>
            </div>
          ) : (
            <div className="flex flex-row gap-x-3 py-2">
              <button
                className="block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2 transition shadow-sm text-white mx-3"
                onClick={() => setEditing(!editing)}>
                Edit your symptom
              </button>
              <Link href={`mybookings/${bookingItem._id}`}>
                <button
                  className="block rounded-md bg-red-600 hover:bg-red-700 transition px-3 py-2
                            shadow-sm text-white mx-3">
                  Remove Booking
                </button>
              </Link>
              <button className='rounded-md bg-black px-4 hover:bg-gray-700 transition shadow-sm text-white mx-3'
                onClick={()=>{setPopUpBoolean(!popUpBoolean)}}>
                Test comment
              </button>
              <Context.Provider value={contextValue}>
              <PopupCommentNRating visible={popUpBoolean}></PopupCommentNRating>        
              </Context.Provider>
            </div>
          )}
      
      </div>
    </div>
  );
}
