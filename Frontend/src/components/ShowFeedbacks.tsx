import getFeedbackForOne from '@/libs/getFeedbackForOne';
import ShowOneFeedback from './ShowOneFeedback';

export default async function ShowFeedback({dentistId}:{dentistId:string}) {

  const feedbacks = await getFeedbackForOne(dentistId) ;

  return (
    <div className='space-y-4'>
      {feedbacks.map((feedback: FeedbackItem) => (
        <ShowOneFeedback
          key={feedback._id}
          feedback={feedback}
        />
      ))}
    </div>
  );
}
