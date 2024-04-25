export default async function submitFeedback(
    token: string,
    comment: string,
    rating: number,
    dentistId: string,
  ) {
      const response = await fetch(`/api/v1/dentists/${dentistId}/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization : `Bearer ${token}`
        },
        body: JSON.stringify({ comment:comment, rating:rating }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit feedback`);
      }
      
      return await response.json() ;
  }