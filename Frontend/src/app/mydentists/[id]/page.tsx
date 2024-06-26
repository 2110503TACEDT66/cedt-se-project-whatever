import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getDentist from '@/libs/getDentist';
import Image from 'next/image';
import FeedbackSection from '@/components/FeedbackSection';

export default async function MyDentistId({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const dentistDetail: OneDentistJson = await getDentist(params.id);

  return (
    <main className="p-16 mt-16 flex flex-row space-x-16 items-start">
      <div className="flex flex-col space-y-8">
        <div className="w-96 h-96 flex-0 relative">
          <Image
            src={dentistDetail.data.picture}
            alt="Dentist Picture"
            fill
            className="rounded-full object-cover border border-rose-400"
          />
        </div>

        <div className="mx-5 text-left">
          <div>
            <span className="text-2xl font-bold font-body text-rose-700">
              Name:{' '}
            </span>
            <span className="text-2xl text-black">
              {dentistDetail.data.name}
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold font-body text-rose-700">
              Experience:{' '}
            </span>
            <span className="text-2xl text-black">
              {dentistDetail.data.experience}
            </span>
            <span className="text-2xl text-black"> years</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-body text-rose-700">
              Expertise:{' '}
            </span>
            <span className="text-2xl text-black">
              {dentistDetail.data.expertise}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col shrink space-y-4 bg-white w-full p-6 sahdow-xl">
        <FeedbackSection dentistId={params.id} />
      </div>
    </main>
  );
}
