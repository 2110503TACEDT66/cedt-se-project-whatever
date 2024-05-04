import getDentists from '@/libs/getDentists';

import BookingPagSon from '@/components/BookingPageSon';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getBookings from '@/libs/getBookings';
import { redirect } from 'next/navigation';

export default async function Dentist() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  if (session.user.role === "receptionist") {
    redirect("/")
  }

  const bookings = (await getBookings(session.user.token)) as BookingItem[];
  let allowBook = true;

  for (const booking of bookings) {
    if (booking.status !== 'finish') {
      allowBook = false;
      break;
    }
  }

  if (allowBook) {
    const dentistJson = await getDentists();
    const dentists = dentistJson.data;

    return (
      <main className="text-center p-5 my-20">
        <BookingPagSon dentists={dentists} />
      </main>
    );
  } else {
    return (
      <div className=" top-24 z-20 text-center">
        <div className="text-center p-5 text-4xl font-body font-lg rounded-lg font-semibold text-cyan-800 mt-24 inline-block ">
          You have already booked
        </div>
      </div>
    );
  }
}
