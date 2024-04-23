'use client'
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
import {Context} from './Booking'

export default function PopupCommentNRating({visible}:{visible:boolean}){
    const { popUpBoolean, setPopUpBoolean } = useContext(Context)!
    if(visible)return(
        <div>
            <div className="bg-gray-600 fixed ml-auto mr-auto left-0 right-0 text-center top-0 w-full h-full opacity-50">
            </div>
            <div className='bg-white fixed ml-auto mr-auto left-0 right-0 top-36 w-[50%] h-[60%] p-7 rounded-3xl z-40 shadow-lg'>
                <div className="text-black text-lg font-bold">Feedback</div>
                <textarea name="textarea" id="1" cols={0} rows={10} 
                className="p-5 w-full border mt-3 rounded-lg border-black resize-none text-black" 
                placeholder="Type your feedback...">
                </textarea>
                <Rating name="size-small" defaultValue={0} size="medium" />
                <button className='bg-sky-600 hover:bg-sky-700 shadow-sm absolute bottom-5 right-5 rounded-2xl px-5 py-2'>
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