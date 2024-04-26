'use client'
import getFeedbackForOne from '@/libs/getFeedbackForOne';
import ShowOneFeedback from './ShowOneFeedback';
import { Suspense, useState, useEffect } from 'react';

export default function ShowFeedback({dentistId}:{dentistId:string}) {
  const [data,setData] = useState([]) ;
  const [page,setPage] = useState<number>(1) ;

  useEffect(() => {
    getFeedbackForOne(dentistId,page).then((res) => {setData(res.data)}) ;
  },[page])

  return (
    <div className='space-y-4'>
      <div className='flex flex-row'>
        {page <= 1 ? null : <button className="rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2
              shadow-sm text-white" onClick={() => {setPage(page-1);}}>
            Back
          </button>
          }
        
        <p className='text-black px-6 py-3'>{page}</p>
        
        {data.length == 0 ? null : <button className="rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2
            shadow-sm text-white" onClick={() => {setPage(page+1);}}>
          Next
        </button>}
        </div>
        
      {data.length == 0 ? ( <p className='text-red-400'>No data on this page</p> ) : ( data.map((feedback: FeedbackItem) => (
        
        <ShowOneFeedback
          key={feedback._id}
          feedback={feedback}
        />
        
        )))}
      
    </div>
    
  );
}
