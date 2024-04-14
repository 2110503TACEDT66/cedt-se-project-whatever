import BookingList from '@/components/BookingList';
import RecepBookingList from '@/components/RecepBookingList';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUserProfile from '@/libs/getUserProfile';

export default async function MyBooking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null

  const info = await getUserProfile(session?.user.token);

  //console.log(info.role) ;

  return (
    <main>
      {info.data.role === 'receptionist' ? (
        <RecepBookingList/>
      ) : (
        '<BookingList/>'
      )}
    </main>
  );
}
