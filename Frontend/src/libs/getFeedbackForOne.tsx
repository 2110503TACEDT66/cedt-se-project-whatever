export default async function getFeedbackForOne(dentistId:string, page:number=1) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${dentistId}/feedbacks/?page=${page}`);
    if (!response.ok) {
      console.log(response)
      throw new Error('Failed to fetch feedbacks');
    }
    return await response.json();
  }
  