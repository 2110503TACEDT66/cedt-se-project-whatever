import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CancelPage({params} : {params : {id:string}}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    return (
        <main className="w-full flex flex-col items-center space-y-8 mt-6">
            <div className="text-4xl text-center font-bold text-white mb-8 mt-6">Cancel Booking</div>
            <div className="w-auto flex flex-col bg-white rounded-3xl p-24 bg-opacity-5">
            <div className="text-2xl text-center font-bold text-black mb-8">Are you sure you want to cancel this booking?<br></br>This can't be undone</div>

            {session.user.role === 'receptionist' ? 
                <div className="flex flex-row space-x-6 items-center text-center">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-2xl font-semibold w-80 text-center h-auto">Patient Tel. Number</div>
                        <div className="text-2xl font-semibold w-80 text-center h-auto">Patient Email</div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-80 max-w-md bg-gray-200 text-center
                            px-6 py-3 text-black font-semibold text-xl">{session.user.email}
                        </div>
                        <div className="w-80 max-w-md bg-gray-200 text-center
                            px-6 py-3 text-black font-semibold text-xl">{session.user.tel}
                        </div>
                    </div>
                </div>
                : 
                null
            }

            <Link href={"/"} className="items-center text-center">
                <button name="Book Vaccine" className="w-full max-w-md rounded-md bg-fuchsia-600 
                hover:bg-fuchsia-700 px-6 py-3 text-white font-semibold shadow-lg text-xl mt-12">
                    Request Cancelation
                </button>
            </Link>
            </div>
        </main>
    );
}