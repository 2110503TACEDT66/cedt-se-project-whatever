'use server';
import { revalidateTag } from 'next/cache';

export default async function submitFeedback(
  token: string,
  comment: string,
  rating: number,
  dentistId: string,
  booking: string
) {
  // check for existing feedback for this booking
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/feedbacks?booking=${booking}`
  );
  if (!res.ok) {
    throw new Error(`Failed to submit feedback`);
  }
  const resReady = await res.json();

  let response;
  if (resReady.count === 1) {
    response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/feedbacks/${resReady.data[0]._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: comment,
          rating: rating,
        }),
      }
    );
  } else {
    response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/dentists/${dentistId}/feedbacks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: comment,
          rating: rating,
          booking: booking,
        }),
      }
    );
  }
  if (!response.ok) {
    throw new Error(`Failed to submit feedback`);
  }
  revalidateTag('feedback');
  return await response.json();
}
