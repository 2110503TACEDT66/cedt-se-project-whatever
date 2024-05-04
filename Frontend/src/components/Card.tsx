import Image from 'next/image';
import { Rating } from '@mui/material';

export default function Card({ dentist }: { dentist: DentistItem }) {
  return (
    <div
      className="w-full h-[300px] shadow-lg rounded-lg bg-white"
      data-testid="1112">
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={dentist.picture}
          alt="Dentist"
          fill={true}
          sizes="100vw"
          className="object-cover rounded-t-lg"
        />
      </div>
      <Rating
        precision={0.25}
        value={dentist.averageRating}
        readOnly
        className="p-2 center"
      />
      <div className="w-full text-center h-[30%] relative text-black">
        {dentist.name}
      </div>
    </div>
  );
}
