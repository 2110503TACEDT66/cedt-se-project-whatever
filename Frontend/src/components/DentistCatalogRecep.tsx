'use client';
import Link from 'next/link';
import Card from './Card';

export default function DentistCatalogRecep({
  dentists,
}: {
  dentists: DentistItem[];
}) {
  return (
    <div className="mt-36">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dentists.map((dentistItem: DentistItem) => (
          <Link
            href={`/mydentists/${dentistItem.id}`}
            className="rounded-md overflow-hidden shadow-md text-center
                hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            key={dentistItem.id}>
            <Card dentist={dentistItem} />
          </Link>
        ))}
      </div>
    </div>
  );
}
