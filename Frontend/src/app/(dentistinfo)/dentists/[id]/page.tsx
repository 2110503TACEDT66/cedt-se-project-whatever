import Image from 'next/image';
import getDentist from '@/libs/getDentist';
import SymptomField from '@/components/symptomField';
import createBooking from '@/libs/createBooking';
import { redirect } from 'next/navigation';
import { Rating } from '@mui/material';

export default async function DentistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const dentistDetail = await getDentist(params.id);
  // console.log(dentistDetail);
  async function handleCreateBooking(
    token: string,
    user: string,
    dentist: string,
    startDate: string,
    endDate: string,
    symptom: string
  ) {
    'use server';
    console.log(startDate) ;
    console.log(endDate) ;
    await createBooking(token, user, dentist, startDate, endDate, symptom);
    redirect('/mybookings');
  }
  const mockUserName = "LieMaiRaiGard"
    const mockStar = 5
    const mockComment = "ให้บริการดีมากเลยครัฟ อาหารอร่อย ห้องน้ำสะอาดสุดๆ ที่จอดรถกว้างมาก"

  return (
    <main className="p-16 mt-16 flex flex-row space-x-16 items-start">
        <div className="flex flex-col space-y-8">
          <div className='w-96 h-96 flex-0 relative'>
            <Image
              src={dentistDetail.data.picture}
              alt="Dentist Picture"
              fill           
              className="rounded-full bg-black object-cover"
            />
          </div>
          
          <div className="mx-5 text-left">
            <div>
              <span className='text-4xl font-bold font-mono text-cyan-900'>Name:</span>
              <span className='text-3xl text-black'>{dentistDetail.data.name}</span>
            </div>
            <div>
              <span className='text-4xl font-bold font-mono text-cyan-900'>Experience:</span>
              <span className='text-3xl text-black'>{dentistDetail.data.experience}</span>
              <span className='text-3xl text-black'> years</span>
            </div>
            <div>
              <span className='text-4xl font-bold font-mono text-cyan-900'>Expertise:</span>
              <span className='text-3xl text-black'>{dentistDetail.data.expertise}</span>
            </div>
            <SymptomField
            dentist={params.id}
            onCreateBooking={handleCreateBooking}
          />
          </div>
        </div>
        
        <div className="flex flex-col shrink space-y-4 bg-white w-full p-6">

          <div className='bg-slate-200 flex flex-col w-full a rounded-lg p-4'>
            <div className='font-bold text-xl text-black items-center flex gap-2'>
              {mockUserName}: 
              <Rating
                name="simple-controlled"
                value={mockStar}
                readOnly
                className='text-center items-center'
              />
            </div>
            <div className='text-black text-lg pl-8 pt-6'>{mockComment}</div>
          </div>

          <div className='bg-slate-200 flex flex-col w-full a rounded-lg p-4'>
            <div className='font-bold text-xl text-black items-center flex gap-2'>
              {mockUserName}: 
              <Rating
                name="simple-controlled"
                value={mockStar}
                readOnly
                className='text-center items-center'
              />
            </div>
            <div className='text-black text-lg pl-8 pt-6'>{mockComment}</div>
          </div>

        </div>
      </main>
  );
}
