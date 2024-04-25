'use client'
import { useState, useEffect } from "react"
import getFeedbackForOne from '@/libs/getFeedbackForOne';
import Rating from '@mui/material/Rating';

export default function FeedbackPagination({paramsId}:{paramsId:string}){
    const [page, setPage] = useState<number>(1)
    const [feedbackDetail, setFeedbackDetail] = useState<FeedbackItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFeedbackForOne(paramsId, page);
            setFeedbackDetail(data);
        };
        
        fetchData();
    }, []);

    const something = async () => {
        setPage(prevPage => prevPage + 1);
        const data = await getFeedbackForOne(paramsId, page);
        setFeedbackDetail(prevFeedback => [...prevFeedback, ...data]);
    };

    return(
        <div>
            <div><button className="bg-slate-100 text-cyan-900 font-bold text-xl" onClick={async()=>{something()}}>next</button></div>
            {page}
            { feedbackDetail.length === 0 ? null :
                <div className="flex flex-col shrink space-y-4 bg-white w-full p-6">
                    {feedbackDetail.map((feedbackItem:FeedbackItem) => (
                        <div className='bg-slate-200 flex flex-col w-full a rounded-lg p-4' key={feedbackItem._id}>
                            <div className='font-bold text-xl text-black items-center flex gap-2'>
                                {feedbackItem.user.name}: 
                                <Rating
                                    name="simple-controlled"
                                    value={feedbackItem.rating}
                                    readOnly
                                    className='text-center items-center'
                                />
                            </div>
                            <div className='text-black text-lg pl-8 pt-6'>{feedbackItem.comment}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}


