import Image from 'next/image';
import getDentist from '@/libs/getDentist';
import SymptomField from '@/components/symptomField';
import createBooking from '@/libs/createBooking';
import { redirect } from 'next/navigation';
import { Rating } from '@mui/material';
import ShowFeedback from '@/components/ShowFeedbacks';
import getFeedbackForOne from '@/libs/getFeedbackForOne';

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
  const feedbackDetail = await getFeedbackForOne(params.id,1);
  
  // console.log(feedbackDetail) ;

  return (
    <main className="p-16 mt-16 flex flex-row space-x-16 items-start">
        <div className="flex flex-col space-y-8">
          <div className='w-96 h-96 flex-0 relative'>
            <Image
              src={dentistDetail.data.picture}
              alt="Dentist Picture"
              fill           
              className="rounded-full bg-black object-cover border border-black"
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
        
        {/* { feedbackDetail.count == 0 ? null : */}
        <div className="flex flex-col shrink space-y-4 bg-white w-full p-6">

          <ShowFeedback dentistId={params.id}  />

        </div>
        {/* } */}
      </main>
  );
}
