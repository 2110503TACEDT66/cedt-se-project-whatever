import Image from 'next/image';
import { Rating } from '@mui/material';

export default function Card({
  dentistName,
  imgSrc
}: {
  dentistName: string,
  imgSrc:string;

}) {
  return (
    <div className='w-full h-[300px] shadow-lg rounded-lg bg-white' data-testid='1112'> 
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Vaccine"
          fill={true}
          className="object-cover round-t-lg"
        />
        
      </div>
      <div className='w-full h-[30%] relative text-black'>{dentistName}</div>
    </div>
  );
}
