'use client';
import { useState } from 'react';
import ShowOneFeedback from './ShowOneFeedback';

export default function FeedbackNav({
  feedbacks,
}: {
  feedbacks: FeedbackItem[];
}) {
  const [page, setPage] = useState(1);
  const handlePageChange = (next: boolean) => {
    setPage(next ? page + 1 : page - 1);
  };

  const showItem = (): FeedbackItem[] => {
    let startIndex: number = (page - 1) * 4;
    let endIndex: number = startIndex + 4;
    return feedbacks.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        {page > 1 ? (
          <button
            className="rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2
            shadow-sm text-white h-10"
            onClick={() => {
              handlePageChange(false);
            }}>
            Back
          </button>
        ) : null}
        <div className="text-black pl-6 pr-2 text-lg">Page : {page}</div>
        {page * 4 < feedbacks.length ? (
          <button
            className="rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2
            shadow-sm text-white h-10"
            onClick={() => {
              handlePageChange(true);
            }}>
            Next
          </button>
        ) : null}
      </div>
      <div className="flex flex-col items-center"></div>
      {showItem().map((feedback: FeedbackItem) => (
        <ShowOneFeedback key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
}
