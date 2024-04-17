'use client';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import confirmStatusBooking from '@/libs/comfirmStatusBooking';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [creatingCureBooking, setCreatingCureBooking] = useState<boolean>(false);

  //console.log(bookingItem.reqType);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex flex-col bg-slate-200 rounded-lg mx-4">
      <div className="px-5 pt-2 flex flex-row text-black">
        <Image
          src={bookingItem.dentist.picture}
          alt="dentist"
          width={0}
          height={0}
          sizes="100vh"
          className="h-36 w-auto object-cover mr-4 my-4 rounded-lg"></Image>
        <div className="my-4">
          <div>
            <span className="text-xl font-bold font-mono text-cyan-900">
              Patient:{' '}
            </span>
            <span className="text-lg">{bookingItem.user.name}</span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-cyan-900">
              Dentist:{' '}
            </span>
            <span className="text-lg">{bookingItem.dentist.name}</span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-cyan-900">
              Booking date:{' '}
            </span>
            <span className="text-lg">
              {new Date(bookingItem.startDate).toUTCString()}
            </span>
            <span className="text-lg">{' - '}</span>
            <span className="text-lg">
            {new Date(bookingItem.endDate).toUTCString()}
            </span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-cyan-900">
              Symptom:{' '}
            </span>
            <span className="text-lg">{bookingItem.symptom}</span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-cyan-900">
              Status:{' '}
            </span>
            <span className="text-lg">{bookingItem.status}</span>
          </div>
        </div>
      </div>
      <div className="px-2 pb-4 flex flex-row">
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
                  bookingItem.startDate,
                  bookingItem.endDate,
                  newSymptom,
                  session.user.token
                );
              }}>
              Confirm editing
            </button>
          </div>
        ) : creatingCureBooking ? (
          <div className="flex flex-row gap-x-3 py-2">
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
              className="block rounded-md px-3 py-2 shadow-sm mx-3"
            />
            <DatePicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
              className="block rounded-md px-3 py-2 shadow-sm mx-3"
            />
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => setCreatingCureBooking(!creatingCureBooking)}>
              Cancel editing
            </button>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => {
                setCreatingCureBooking(!creatingCureBooking);
                onUpdateBooking(
                  bookingItem._id,
                  startDate,
                  endDate,
                  bookingItem.symptom,
                  session.user.token
                );
              }}>
              Confirm editing
            </button>
          </div>
          ) : bookingItem.reqType === 'checkup' ? (
          <div className="flex flex-row gap-x-3 py-2">
            {bookingItem.status === 'finish' ? (
            <button
              className="block rounded-md bg-green-600 hover:bg-green-700 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => setCreatingCureBooking(true)}>
              Create cure booking
            </button>
              ) : (
              <button
                className="block rounded-md bg-green-600 hover:bg-green-700 px-3 py-2 shadow-sm text-white mx-3"
                onClick={() => {
                  confirmStatusBooking(session.user.token, bookingItem._id);
                }}>
              Finish checkup
              </button>
            )}
            <button
              className="block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => setEditing(!editing)}>
              Edit your symptom
            </button>
            <Link href={`mybookings/${bookingItem._id}`}>
              <button
                className="block rounded-md bg-red-600 hover:bg-red-700 px-3 py-2
                    shadow-sm text-white mx-3">
                Cancel Booking
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row gap-x-3 py-2">
            <button
              className="block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2 shadow-sm text-white mx-3"
              onClick={() => setEditing(!editing)}>
              Edit your symptom
            </button>
            <Link href={`mybookings/${bookingItem._id}`}>
              <button
                className="block rounded-md bg-red-600 hover:bg-red-700 px-3 py-2
                    shadow-sm text-white mx-3">
                Cancel Booking
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </LocalizationProvider>
  );
}
