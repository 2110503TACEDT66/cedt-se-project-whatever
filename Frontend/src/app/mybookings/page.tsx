import BookingList from '@/components/BookingList';
import RecepBookingList from '@/components/RecepBookingList';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function MyBooking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  return (
    <main>
      {session.user.role === 'receptionist' ? (
        <RecepBookingList />
      ) : (
        <BookingList />
      )}
    </main>
  );
}
