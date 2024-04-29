'use client';
import Link from "next/link";
import Card from "./Card";

export default function DentistCatalogRecep({dentistsJson}:{dentistsJson:DentistJson}) {
  const dentistJsonReady = dentistsJson;
  return (
    <div className="mt-36">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dentistJsonReady.data.map((dentistItem: DentistItem) => 
                <Link href={`/mydentists/${dentistItem.id}`} className='rounded-md overflow-hidden shadow-md text-center
                hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1' key={dentistItem.id}>
                  <Card
                    dentistName={dentistItem.name}
                    imgSrc={dentistItem.picture}
                    dentistId={dentistItem.id}
                  />
                </Link>
                ) 
            }
          </div>
        </div>
  )
}
