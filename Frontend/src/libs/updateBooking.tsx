'use server';
import { revalidateTag } from 'next/cache';

export default async function updateBooking(
  id: string,
  token: string,
  body: {
    startDate?: string;
    endDate?: string;
    user?: string;
    dentist?: string;
    symptom?: string;
    status?: string;
    reqType?: string;
    createdAt?: string;
  }
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to update booking');
  }
  revalidateTag('booking');
  return await response.json();
}
