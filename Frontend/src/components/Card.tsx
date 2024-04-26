import Image from 'next/image';
import { Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import getFeedbackForOne from '@/libs/getFeedbackForOne';

export default function Card({
  dentistName,
  imgSrc,
  dentistId
}: {
  dentistName: string,
  imgSrc:string;
  dentistId:string;
}) {

  const [avgRating,setAvgRating] = useState<number>(0) ;

  useEffect(() => {
    getFeedbackForOne(dentistId).then((res) => {setAvgRating(res.averageRating)}) ;
  })

  return (
    <div className='w-full h-[300px] shadow-lg rounded-lg bg-white' data-testid='1112'> 
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Dentist"
          fill={true}
          className="object-cover rounded-t-lg"
        />
        
      </div>
      <Rating
          precision={0.25}
          value={avgRating}
          readOnly
          className='p-2'
        />
      <div className='w-full h-[30%] relative text-black'>{dentistName}</div>
      
    </div>
  );
}
