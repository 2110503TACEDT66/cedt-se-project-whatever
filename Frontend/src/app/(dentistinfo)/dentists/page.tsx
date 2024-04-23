import getDentists from '@/libs/getDentists';

import BookingPagSon from '@/components/BookingPageSon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';

export default async function Dentist() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookings = (await getBookings(session.user.token)) as BookingItem[];
  let allowBook = true;

  for (const booking of bookings) {
    if (booking.status !== 'finish') {
      allowBook = false;
      break;
    }
  }

  if (allowBook) {
    const dentists = await getDentists();
    return (
      <main className="text-center p-5 my-20">
        <BookingPagSon dentistJson={dentists} />
      </main>
    );
  } else {
    return (
      <h1 className="text-center p-5 text-6xl font-serif font-lg text-cyan-500 mt-24">
        You have already booked
      </h1>
    );
  }
}
