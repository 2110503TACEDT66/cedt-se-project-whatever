'use client'
import deleteBooking from "@/libs/deleteBooking";
import Link from "next/link";

export default function CancelButton({userToken, bookingId} : {userToken:string, bookingId:string}) {

    return (
        <div className="text-center items-center">
            <Link href={"/"} className="text-center items-center">
                <button name="Book Vaccine" className=" rounded-md bg-fuchsia-600 
                hover:bg-fuchsia-700 px-6 py-3 text-white font-semibold shadow-lg text-xl mt-12"
                onClick={async () => {
                  const cf = confirm(
                    'Are you sure you want to delete this booking?'
                  );
                  if (cf) await deleteBooking(bookingId, userToken);
                }}
                >
                    Request Cancelation
                </button>
            </Link>
        </div>
    )
}