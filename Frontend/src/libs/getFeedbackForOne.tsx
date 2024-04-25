export default async function getFeedbackForOne(dentistId:string, page:number) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${dentistId}/feedbacks/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks');
    }
    const feedbacks = await response.json();
    return feedbacks.data;
  }
  