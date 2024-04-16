import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';
import RecepBooking from './RecepBooking';
import deleteBooking from '@/libs/deleteBooking';
import updateBooking from '@/libs/updateBooking';
import createCureBooking from '@/libs/createCureBooking';

export default async function RecepBookingList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookingItems = await getBookings(session.user.token);

  return (
    <div>
      {bookingItems.map((bookingItem: BookingItem) => (
        <RecepBooking
          key={bookingItem._id}
          bookingItem={bookingItem}
          onDeleteBooking={deleteBooking}
          onUpdateBooking={updateBooking}
          onCreateCureBooking={createCureBooking}
        />
      ))}
    </div>
  );
}
