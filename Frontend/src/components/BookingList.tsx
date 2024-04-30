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
    <div className='mt-20 space-y-4' id="Userbookingdiv">
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
        <div className=" top-24 z-20 text-center">
       
          <div className=" p-5 text-4xl font-body font-lg rounded-lg font-semibold text-cyan-800 inline-block ">
          No Dentists Booked
        </div>
        </div>
      )}
    </div>
  );
}
