'use server';
import { revalidateTag } from 'next/cache';

export default async function finishCheckupBooking(
  token: string,
  bookingId: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: 'finish',
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update booking`);
  }
  revalidateTag('booking');
  revalidateTag('onebooking');
  return await response.json();
}
