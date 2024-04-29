'use client';
import Link from 'next/link';
import Card from './Card';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export default function DentistCatalog({
  dentistsJson,
  date,
  expertise,
  experience,
}: {
  dentistsJson: DentistJson;
  date: string;
  expertise: string;
  experience: number;
}) {
  const dentistJsonReady = dentistsJson;

  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          date !== '' // Check if 'date' is not empty
            ? dentistJsonReady.data.map(
                (
                  dentistItem: DentistItem // Map over the 'dentistJsonReady.data' array
                ) =>
                  !dentistItem.bookings?.some((bookdate: BookingItem) => {
                    // Check if no booking overlaps with the selected time
                    const selectedDate = new Date(date); // Create a Date object from the selected date
                    const selectedEndDate = new Date(selectedDate); // Create a copy of the selected date
                    selectedEndDate.setHours(selectedEndDate.getHours() + 1); // Set the end time 1 hour after the selected time
                    const bookingStartDate = new Date(bookdate.startDate);
                    const bookingEndDate = new Date(bookdate.endDate);

                    if (
                      bookingStartDate <= selectedDate &&
                      selectedEndDate <= bookingEndDate
                    ) {
                      return true; // If the new booking overlaps with an existing booking, return true
                    }
                    return false; // If there's no overlap, return false
                  }) &&
                  (dentistItem.expertise === expertise || expertise === '') && // Check if dentist's expertise matches or is empty
                  (dentistItem.experience >= experience || experience === 0) ? ( // Check if dentist's experience meets the requirement or is 0
                    <Link
                      href={`/dentists/${dentistItem.id}`}
                      className="rounded-md overflow-hidden shadow-md 
      hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                      <Card
                        dentistName={dentistItem.name}
                        imgSrc={dentistItem.picture}
                        dentistId={dentistItem.id}
                      />
                    </Link>
                  ) : null // If conditions are met, render a link to the dentist's profile, otherwise return null
              )
            : null // If 'date' is empty, return null
        }
      </div>
    </div>
  );
}
