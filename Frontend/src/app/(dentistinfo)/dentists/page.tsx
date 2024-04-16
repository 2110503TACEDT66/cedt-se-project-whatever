import getDentists from '@/libs/getDentists';

import BookingPagSon from '@/components/BookingPageSon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';
import getUserProfile from '@/libs/getUserProfile';

export default async function Dentist() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);

  const booking = (await getBookings(session.user.token)) as BookingItem[];
  //console.log(profile.data.role);
  if (profile.data.role == 'admin' || booking.length == 0) {
    const dentists = await getDentists();
    return (
      <main className="text-center p-5 mt-20">
        <BookingPagSon dentistJson={dentists} />
      </main>
    );
  } else {
    return <h1 className="text-center p-5 text-6xl font-serif font-lg text-cyan-500 mt-24">You have already booked</h1>;
  }
}
