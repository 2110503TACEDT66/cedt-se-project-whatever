import Image from 'next/image';
import getDentist from '@/libs/getDentist';
import SymptomField from '@/components/symptomField';
import createBooking from '@/libs/createBooking';
import { redirect } from 'next/navigation';

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

  return (
    <main className="mt-16 flex flex-row">
    <div className="flex flex-col space-y-8 px-32 py-8">
      <div className="w-64 h-64 flex-0 relative">
      <Image
        src={dentistDetail.data.picture}
        alt="Dentist Picture"
        fill
        className="rounded-full bg-black object-cover"
      />
    </div>
    <div className="mx-6 text-left">
      <div>
        <span className='text-xl font-bold py-3 font-body text-slate-900'>Name: </span>
        <span className='text-xl text-black'>{dentistDetail.data.name}</span>
      </div>
      <div>
        <span className='text-xl font-bold font-body text-slate-900'>Experience: </span>
        <span className='text-xl text-black'>{dentistDetail.data.experience}</span>
        <span className='text-xl text-black'> years</span>
      </div>
      <div>
        <span className='text-xl block font-bold font-body text-slate-900'>Expertise: </span>
        <span className='text-xl text-black'>{dentistDetail.data.expertise}</span>
      </div>
      <SymptomField
        dentist={params.id}
        onCreateBooking={handleCreateBooking}
      />
    </div>
  </div>
  <div className="flex flex-col w-full p-16">
    <div className='p-5 bg-white'>
      <div className='bg-gray-200 p-5'>
      </div>
    </div>
  </div>
</main>


  );
}
