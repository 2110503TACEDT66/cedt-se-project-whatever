import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';
import RecepBooking from './RecepBooking';
import { revalidateTag } from 'next/cache';

export default async function RecepBookingList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookingItems = await getBookings(session.user.token);

  async function deleteBooking(id: string) {
    'use server';
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
    revalidateTag('booking');
    return await response.json();
  }

  async function updateBooking(id: string, symptom: string) {
    'use server';
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptom: symptom,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update booking');
    }
    revalidateTag('booking');
    return await response.json();
  }

  return (
    <div>
      {bookingItems.map((bookingItem: BookingItem) => (
        <RecepBooking 
          key={bookingItem._id}
          bookingItem={bookingItem}
          onDeleteBooking={deleteBooking}
          onUpdateBooking={updateBooking}
            />
      ))}
    </div>
  );
}
