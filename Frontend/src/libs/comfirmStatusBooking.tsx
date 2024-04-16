'use server';
import { revalidateTag } from 'next/cache';

export default async function confirmStatusBooking(
  token: string,
  bookingId: string,
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: 'confirm',
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to create booking`);
  }
  revalidateTag('booking');
  return await response.json();
}
