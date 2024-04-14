import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CancelPage({params} : {params : {id:string}}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    console.log(session.user.role)

    return (
        <main className="w-full flex flex-col items-center space-y-8 mt-6">
            <div className="text-4xl text-center font-bold text-white mb-8 mt-6">Cancel Booking</div>
            <div className="text-2xl text-center font-bold text-black mb-8">Are you sure you want to cancel this booking?<br></br>This can't be undone</div>
            {/* <div className="w-full max-w-md space-y-4 p-4 bg-gray-100 rounded-lg">
                <div className="text-lg text-gray-800 font-semibold">Choose Booking Date and Location</div>
                <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}
                             onLocationChange={(value:string)=>{setBookLocation(value)}}/>
            </div> */}

            {session.user.role == 'receptionist' ? 
                <div>
                    Hello
                </div>
                : 
                null
            }

            <Link href={"/"} className="items-center text-center">
                <button name="Book Vaccine" className={`w-full max-w-md rounded-md bg-fuchsia-600 
                hover:bg-fuchsia-700 px-6 py-3 text-white font-semibold shadow-lg text-xl mt-12`}
                // onClick={
                //     (bookDate && bookLocation) ?
                //     addBooking : ()=>{Swal.fire({
                //         title: 'Warning',
                //         text: 'Please fill in all fields',
                //         icon: 'warning',
                //         confirmButtonText: 'OK'
                //     })}
                //     }
                    >
                    Request Cancelation
                </button>
            </Link>
        </main>
    );
}