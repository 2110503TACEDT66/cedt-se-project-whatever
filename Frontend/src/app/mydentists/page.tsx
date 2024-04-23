import BookingList from "@/components/BookingList";
import getDentists from "@/libs/getDentists";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import Card from "@/components/Card";

export default async function MyDentist() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const dentistJsonReady = await getDentists();

    return (
        <div className="mt-36">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dentistJsonReady.data.map((dentistItem: DentistItem) => 
                <Link href={`/mydentists/${dentistItem.id}`} className='rounded-md overflow-hidden shadow-md 
                hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1' key={dentistItem.id}>
                  <Card
                    dentistName={dentistItem.name}
                    imgSrc={dentistItem.picture}
                  />
                </Link>
                ) 
            }
          </div>
        </div>
    );
}