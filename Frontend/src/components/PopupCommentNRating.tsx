'use client'
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
import {Context} from './Booking'
import { useState } from 'react';
import submitFeedback from '@/libs/submitFeedback';
import { useSession } from 'next-auth/react';

export default function PopupCommentNRating({ visible, dentistId }: { visible: boolean, dentistId: string }){
    const { popUpBoolean, setPopUpBoolean } = useContext(Context)!
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const { data: session } = useSession();
    if (!session || !session.user.token) return null;

    const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
        if (value !== null) {
            setRating(value);
        }
    };

    if(visible)return(
        <div>
            <div className="bg-gray-600 fixed ml-auto mr-auto left-0 right-0 text-center top-0 w-full h-full opacity-50">
            </div>
            <div className='bg-white fixed ml-auto mr-auto left-0 right-0 top-36 w-[50%] h-[60%] p-7 rounded-3xl z-40 shadow-lg'>
                <div className="text-black text-lg font-bold">Feedback</div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="textarea" id="1" cols={0} rows={10} 
                className="p-5 w-full border mt-3 rounded-lg border-black resize-none text-black" 
                placeholder="Type your feedback...">
                </textarea>
                <Rating name="size-small" defaultValue={0} value={rating} onChange={handleRatingChange} size="medium" />
                <button className='bg-sky-600 hover:bg-sky-700 shadow-sm absolute bottom-5 right-5 rounded-2xl px-5 py-2'
                onClick={() => submitFeedback(session.user.token,comment, rating, dentistId)}>
                  Submit
                </button>
                <button className='bg-sky-600 hover:bg-sky-700 shadow-sm absolute bottom-5 right-32 rounded-2xl px-5 py-2'
                onClick={()=>{setPopUpBoolean(!popUpBoolean)}}>
                    Cancel
                </button>
            </div>            
        </div>
    )
    else
    return (
        <div></div>
    ) 
}