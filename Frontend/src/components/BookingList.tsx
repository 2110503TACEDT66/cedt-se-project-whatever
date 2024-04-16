import getBookings from '@/libs/getBookings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidateTag } from 'next/cache';
import Booking from './Booking';
import deleteBooking from '@/libs/deleteBooking';
import updateBooking from '@/libs/updateBooking';

export default async function BookingList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookingItems = await getBookings(session?.user.token);

  return (
    <div className='mt-20'>
      {bookingItems.length > 0 ? 
      (
        bookingItems.map((bookingItem: BookingItem) => (
          <Booking
            key={bookingItem._id}
            bookingItem={bookingItem}
            onDeleteBooking={deleteBooking}
            onUpdateBooking={updateBooking}
          />
        ))
      ) : (
        <h1 className="text-center text-4xl font-serif my-5 font-lg">
          No Dentist Booking
        </h1>
      )}
    </div>
  );
}
