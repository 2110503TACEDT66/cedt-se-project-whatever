import getFeedbackForOne from '@/libs/getFeedbackForOne';
import ShowOneFeedback from './ShowOneFeedback';
import FeedbackNav from './FeedbackNav';

export default async function FeedbackSection({
  dentistId,
}: {
  dentistId: string;
}) {
  const response = await getFeedbackForOne(dentistId);
  const feedbacks = response.data;

  return (
    <div className="space-y-4 flex flex-col items-center">
      <FeedbackNav feedbacks={feedbacks} />
    </div>
  );
}
