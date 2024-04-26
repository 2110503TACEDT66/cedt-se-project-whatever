import { revalidateTag } from "next/cache";

export default async function submitFeedback(
    token: string,
    comment: string,
    rating: number,
    dentistId: string,
  ) {
      const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${dentistId}/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({ comment:comment, rating:rating }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit feedback`);
      }
      return await response.json() ;
  }