'use server';
import { revalidateTag } from 'next/cache';

export default async function updateCommented(
  token: string,
  bookingId: string,
  commented: boolean,
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
        commented:commented,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update booking`);
  }
  revalidateTag('booking');
  return await response.json();
}
