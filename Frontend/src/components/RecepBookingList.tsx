import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';
import RecepBooking from './RecepBooking';

export default async function RecepBookingList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookingItems = await getBookings(session.user.token);

  return (
    <div>
      {bookingItems.map((bookingItem) => (
        <RecepBooking booking={bookingItem} />
      ))}
    </div>
  );
}
