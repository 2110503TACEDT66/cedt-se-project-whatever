import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getBooking from "@/libs/getBooking";
import CancelButton from "@/components/CancelButton";
import deleteBooking from "@/libs/deleteBooking";
import { sendMail } from "@/libs/mail";


export default async function CancelPage({params} : {params : {id:string}}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    let uEmail: string = "";
    let uTel: string = "";
    let uName: string = "";
    let role: string = "";
    if (session.user.role == "receptionist") {
        const info:BookingItem = await getBooking(session?.user.token, params.id);
        uEmail = info.user.email
        uTel = info.user.tel
        uName = info.user.name
        role = "receptionist"
    } 

    const send = async()=>{
        "use server"
        await sendMail({to:uEmail,name:uName,subject:"Cancel Booking",
        body:
          `
          <h1>Your Booking has been canceled.</h1>
          <h4>To ${uName}</h4>
          <p>We sincerely apologize. Due to a problem, our dentist was unable to come and treat you on the day you reserved the time. If you would like to change your treatment time or change dentist, please contact our receptionist.</p>
          <div class="content"><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.facebook.com" target="_self"><img alt="Facebook" src="https://i0.wp.com/ladolcevitasarasota.com/wp-content/uploads/2023/03/facebook-logo-icon-facebook-icon-png-images-icons-and-png-backgrounds-1.png?fit=1000%2C1000&ssl=1&w=640" width="30" height="30" title="facebook"/></a></span><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_self"><img alt="Twitter" src="https://cdn.icon-icons.com/icons2/4029/PNG/512/twitter_x_new_logo_square_x_icon_256075.png" width="40" height="33" title="twitter"/></a></span><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com" target="_self"><img alt="Linkedin" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" width="30" height="30" title="linkedin"/></a></span><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.instagram.com" target="_self"><img alt="Instagram" src="https://static.vecteezy.com/system/resources/previews/018/930/415/original/instagram-logo-instagram-icon-transparent-free-png.png" width="30" height="30" title="instagram"/></a></span></div>
          `,})
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
            <CancelButton userToken={session.user.token} bookingId={params.id} emailSender={send} role={role}/>
            </div>
        </main>
    );
}