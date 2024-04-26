export default async function getFeedbacks() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/feedbacks`);
    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks');
    }
    return await response.json();
  }
  