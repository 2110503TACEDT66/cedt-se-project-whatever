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
    <main className="text-center p-5 mt-16">
      <div className="flex flex-row">
        <Image
          src={dentistDetail.data.picture}
          alt="Dentist Picture"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%] bg-black"
        />
        <div className="mx-5 text-left">
          <div>
            <span className='text-2xl font-bold font-mono text-cyan-900'>Name: </span>
            <span className='text-xl text-black'>{dentistDetail.data.name}</span>
          </div>
          <div>
            <span className='text-2xl font-bold font-mono text-cyan-900'>Years of Experience: </span>
            <span className='text-xl text-black'>{dentistDetail.data.experience}</span>
          </div>
          <div>
            <span className='text-2xl font-bold font-mono text-cyan-900'>Area of expertise: </span>
            <span className='text-xl text-black'>{dentistDetail.data.expertise}</span>
          </div>
          <SymptomField
            dentist={params.id}
            onCreateBooking={handleCreateBooking}
          />
        </div>
      </div>
    </main>
  );
}
