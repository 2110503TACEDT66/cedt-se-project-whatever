import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getBooking from "@/libs/getBooking";
import CancelButton from "@/components/CancelButton";
import deleteBooking from "@/libs/deleteBooking";

export default async function CancelPage({params} : {params : {id:string}}) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    var uEmail
    var uTel
    if (session.user.role == "receptionist") {
        const info:BookingItem = await getBooking(session?.user.token, params.id);
        uEmail = info.user.email
        uTel = info.user.tel
    } 

    return (
        <main className="flex flex-col items-center space-y-8 mt-6">
            <div className="text-4xl text-center font-bold text-white mb-8 mt-6">Cancel Booking</div>
            <div className="bg-white rounded-3xl p-24 bg-opacity-5">
            <div className="flex flex-col">
            <div className="text-2xl text-center font-bold text-black mb-8">Are you sure you want to cancel this booking?<br></br>This can't be undone</div>

            {session.user.role === 'receptionist' ? 
                <div className="flex flex-row space-x-6 items-center text-center">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-2xl font-semibold w-80 text-center h-auto">Patient Tel. Number</div>
                        <div className="text-2xl font-semibold w-80 text-center h-auto">Patient Email</div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-[448px] max-w-md bg-gray-200 text-center
                            px-6 py-3 text-black font-semibold text-xl">{uTel}
                        </div>
                        <div className="w-[448px] max-w-md bg-gray-200 text-center
                            px-6 py-3 text-black font-semibold text-xl">{uEmail}
                        </div>
                    </div>
                </div>
                : 
                null
            }
            </div>
            <CancelButton userToken={session.user.token} bookingId={params.id}/>
            </div>
        </main>
    );
}