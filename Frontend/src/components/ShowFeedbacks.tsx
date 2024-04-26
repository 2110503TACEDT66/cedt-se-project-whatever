'use client'
import getFeedbackForOne from '@/libs/getFeedbackForOne';
import ShowOneFeedback from './ShowOneFeedback';
import { Suspense, useState, useEffect } from 'react';

export default function ShowFeedback({dentistId}:{dentistId:string}) {
  const [data,setData] = useState([]) ;
  const [page,setPage] = useState<number>(1) ;

  useEffect(() => {
    getFeedbackForOne(dentistId,page).then((data) => {setData(data)}) ;
  },[page])

  return (
    <div className='space-y-4'>
      <div className='flex flex-row'>
        {data.length == 0 ? null : <button className="rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2
            shadow-sm text-white" onClick={() => {setPage(page+1);}}>
          Next
        </button>}
        
        <p className='text-black px-6 py-3'>{page}</p>
        {page <= 1 ? null : <button className="rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2
            shadow-sm text-white" onClick={() => {setPage(page-1);}}>
          Back
        </button>
        }
        </div>
        
      
      {data.map((feedback: FeedbackItem) => (
        <ShowOneFeedback
          key={feedback._id}
          feedback={feedback}
        />
      ))}
    </div>
    
  );
}
