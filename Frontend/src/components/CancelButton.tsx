'use client'
import deleteBooking from "@/libs/deleteBooking";
import Link from "next/link";

export default function CancelButton({userToken, bookingId, emailSender,role} : {userToken:string, bookingId:string, emailSender:Function, role:string}) {

    const send = async () => {
        console.log("helloWorld") ;
        await emailSender(); // Call the emailSender function
    }

    return (
        <div className="text-center items-center">
            <Link href={"/"} className="text-center items-center">
                <button name="Book Vaccine" className=" rounded-xl bg-cyan-500 
                hover:bg-cyan-700 px-6 py-3 text-white font-semibold shadow-lg text-xl mt-12"
                onClick={async () => {
                  const cf = confirm(
                    'Are you sure you want to delete this booking?'
                  );
                  if (cf) {
                    if (role == "receptionist") {
                        send();
                    }
                    
                    await deleteBooking(bookingId, userToken);
                    }
                }}
                >
                    Request Cancelation
                </button>
            </Link>
        </div>
    )
}