import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getDentist from '@/libs/getDentist';
import Image from 'next/image';
import getFeedbackForOne from '@/libs/getFeedbackForOne';
import Rating from '@mui/material/Rating';

export default async function MyDentistId({params} : {params : {id:string}}) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const dentistDetail:OneDentistJson = await getDentist(params.id);
    const feedbackDetail = await getFeedbackForOne(params.id);
    console.log(feedbackDetail)

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
          </div>
        </div>
        
        <div className="flex flex-col shrink space-y-4 bg-white w-full p-6">

          {
            feedbackDetail.map((feedbackItem:FeedbackItem) => 
            <div className='bg-slate-200 flex flex-col w-full a rounded-lg p-4' key={feedbackItem._id}>
              <div className='font-bold text-xl text-black items-center flex gap-2'>
                {feedbackItem.user.name}: 
                <Rating
                  name="simple-controlled"
                  value={feedbackItem.rating}
                  readOnly
                  className='text-center items-center'
                />
              </div>
              <div className='text-black text-lg pl-8 pt-6'>{feedbackItem.comment}</div>
            </div>
            )
          }

        </div>
      </main>
  );
}