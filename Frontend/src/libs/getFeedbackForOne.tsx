export default async function getFeedbackForOne(dentistId:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${dentistId}/feedbacks`);
    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks');
    }
    return await response.json();
  }
  