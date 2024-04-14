import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';
import RecepBooking from './RecepBooking';

export default async function RecepBookingList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookingItems = await getBookings(session.user.token);

  const createCureBooking = async (bookingId: string) => {
    'use server';
    const response = await fetch(
      `http://localhost:5000/api/v1/bookings/${bookingId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({}),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  };

  return (
    <div>
      {bookingItems.map((bookingItem) => (
        <RecepBooking booking={bookingItem} />
      ))}
    </div>
  );
}
