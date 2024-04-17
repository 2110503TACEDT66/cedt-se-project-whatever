'use server';
import { revalidateTag } from 'next/cache';

export default async function updateBooking(
  id: string,
  startDate : string,
  endDate : string,
  symptom: string,
  token: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate : startDate,
        symptom : symptom,
        endDate : endDate,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to update booking');
    console.log(response)
  }
  revalidateTag('booking');
  return await response.json();
}
