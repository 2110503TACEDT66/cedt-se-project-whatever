import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getBooking from "@/libs/getBooking";
import CancelButton from "@/components/CancelButton";
import deleteBooking from "@/libs/deleteBooking";
import { sendMail } from "@/libs/mail";
import { redirect } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";


export default async function CancelPage({params} : {params : {id:string}}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    let booking ;

    const profile = await getUserProfile(session.user.token) ;
    if (profile.data.role === "receptionist") {
        booking = await getBooking(session.user.token,params.id) ;
    }

    return (
        <main className="flex flex-col items-center space-y-8 mt-20">
            <div className="text-6xl text-center font-serif text-cyan-500 mb-8 mt-6">Cancel Booking</div>
            <div className="bg-slate-200 rounded-3xl p-24">
            <div className="flex flex-col">
            <div className="text-2xl text-center font-bold text-cyan-900 mb-8">Are you sure you want to cancel this booking?<br></br>This can't be undone</div>

            {profile.data.role === 'receptionist' ? 
                <div className="flex flex-row space-x-6 items-center text-center">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-2xl font-semibold w-80 text-center h-auto text-cyan-900">Patient Tel. Number</div>
                        <div className="text-2xl font-semibold w-80 text-center h-auto text-cyan-900">Patient Email</div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-[448px] max-w-md bg-cyan-500 text-center
                            px-6 py-3 text-white font-semibold text-xl">{booking.user.tel}
                        </div>
                        <div className="w-[448px] max-w-md bg-cyan-500 text-center
                            px-6 py-3 text-white font-semibold text-xl">{booking.user.email}
                        </div>
                    </div>
                </div>
    :
                null
            }
            </div>
            <CancelButton bookingId={booking?booking.id:params.id}/>
            </div>
        </main>
    );
}
