'use client'
import sendEmail from "@/libs/sendEmail";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CancelButton({bookingId}:{bookingId:string}) {
    const {data:session}=useSession();
    if (!session || !session.user.token) {
        return null ;
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
                        sendEmail(session.user.token,bookingId) ;
                    }
                }}
                >
                    Request Cancelation
                </button>
            </Link>
        </div>
    )
}