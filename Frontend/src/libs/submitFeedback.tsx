export default async function submitFeedback(
    token: string,
    comment: string,
    rating: number,
    dentistId: string,
  ) {
    try {
      const response = await fetch(`/api/v1/dentists/${dentistId}/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization : `Bearer ${token}`
        },
        // body: JSON.stringify({ comment, rating }),
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to submit feedback`);
      }
      return response.json();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }
  