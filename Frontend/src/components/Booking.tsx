'use client';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export default function Booking({
  bookingItem,
  onDeleteBooking,
  onUpdateBooking,
}: {
  bookingItem: BookingItem;
  onDeleteBooking: Function;
  onUpdateBooking: Function;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [newSymptom, setNewSymptom] = useState<String | null>(null);

  return (
    <div className="bg-slate-200 rounded px-5 py-2 my-2 flex flex-row h-1/5 text-black">
      <Image
        src={bookingItem.dentist.picture}
        alt="dentist"
        width={0}
        height={0}
        sizes="100vh"
        className="h-[125px] w-auto object-cover px-4"></Image>
      <div>
        <div className="text-sm">Patient : {bookingItem.user.name}</div>
        <div className="text-sm">Dentist : {bookingItem.dentist.name}</div>
        <div className="text-sm">
          Booking date : {new Date(bookingItem.startDate).toUTCString()}
        </div>
        <div className="text-sm">Symptom : {bookingItem.symptom}</div>
        {editing ? (
          <div className="flex flex-row gap-x-3 py-2">
            <TextField
              variant="standard"
              placeholder="symptom"
              onChange={(e) => {
                setNewSymptom(e.target.value);
              }}
            />
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => setEditing(!editing)}>
              Cancel editing
            </button>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => {
                setEditing(!editing);
                onUpdateBooking(bookingItem._id, newSymptom);
              }}>
              Confirm editing
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-x-3 py-2">
            <button
              className="block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => setEditing(!editing)}>
              Edit your symptom
            </button>
            <button
              className="block rounded-md bg-red-600 hover:bg-red-700 px-3 py-2
                        shadow-sm text-white mx-3"
              onClick={() => {
                const cf = confirm(
                  'Are you sure you want to delete this booking?'
                );
                if (cf) onDeleteBooking(bookingItem._id);
              }}>
              Remove Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
