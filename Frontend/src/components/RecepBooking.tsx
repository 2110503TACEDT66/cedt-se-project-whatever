'use client';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function RecepBooking({
  bookingItem,
  onDeleteBooking,
  onUpdateBooking,
  onCreateCureBooking,
}: {
  bookingItem: BookingItem;
  onDeleteBooking: Function;
  onUpdateBooking: Function;
  onCreateCureBooking: Function;
}) {
  const { data: session } = useSession();
  if (!session || !session.user.token) return null;

  const [editing, setEditing] = useState<boolean>(false);
  const [newSymptom, setNewSymptom] = useState<String | null>(null);

  console.log(bookingItem.reqType);

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
                onUpdateBooking(
                  bookingItem._id,
                  newSymptom,
                  session.user.token
                );
              }}>
              Confirm editing
            </button>
          </div>
        ) : bookingItem.reqType == 'checkup' &&
          bookingItem.status == 'finish' ? (
          <div className="flex flex-row gap-x-3 py-2">
            <button
              className="block rounded-md bg-green-600 hover:bg-green-700 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => {
                onCreateCureBooking(bookingItem._id);
              }}>
              Create cure booking
            </button>
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
                  'Are you sure you want to cancel this booking?'
                );
                if (cf) onDeleteBooking(bookingItem._id, session.user.token);
              }}>
              Cancel Booking
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
                  'Are you sure you want to cancel this booking?'
                );
                if (cf) onDeleteBooking(bookingItem._id);
              }}>
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
