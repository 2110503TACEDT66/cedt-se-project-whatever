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
    await createBooking(token, user, dentist, startDate, endDate, symptom);
    redirect('/mybookings');
  }

  return (
    <main className="text-center p-5">
      <div className="flex flex-row my-5">
        <Image
          src={dentistDetail.data.picture}
          alt="Dentist Picture"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%] bg-black"
        />
        <div className="mx-5 my-5 text-left">
          <div className="text-xl">Name : {dentistDetail.data.name}</div>
          <div className="text-md">
            Years of Experience : {dentistDetail.data.experience}
          </div>
          <div className="text-md">
            Area of Expertise : {dentistDetail.data.expertise}
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
