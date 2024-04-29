import BookingList from "@/components/BookingList";
import getDentists from "@/libs/getDentists";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import Card from "@/components/Card";
import DentistCatalogRecep from "@/components/DentistCatalogRecep";

export default async function MyDentist() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const dentistJsonReady = await getDentists();

    return (
        <DentistCatalogRecep dentistsJson={dentistJsonReady}/>
    );
}