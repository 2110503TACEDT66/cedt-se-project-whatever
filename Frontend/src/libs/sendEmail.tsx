"use server"

import { redirect } from "next/navigation";
import deleteBooking from "./deleteBooking";
import getBooking from "./getBooking";
import getUserProfile from "./getUserProfile";
import { sendMail } from "./mail";
import Swal from "sweetalert2";

export default async function sendEmail (token:string, bookingId:string){
    const user = await getUserProfile(token) ;
    const booking = await getBooking(token,bookingId);
      if (user.role == "receptionist") {
        await sendMail({to:booking.user.email,name:booking.user.name,subject:"Cancel Booking",
        body:
          `
          <h1>Your Booking has been canceled.</h1>
          <h4>To ${booking.user.name}</h4>
          <p>We sincerely apologize. Due to a problem, our dentist was unable to come and treat you on the day you reserved the time. If you would like to change your treatment time or change dentist, please contact our receptionist.</p>
          <div class="content"><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.facebook.com" target="_self"><img alt="Facebook" src="https://i0.wp.com/ladolcevitasarasota.com/wp-content/uploads/2023/03/facebook-logo-icon-facebook-icon-png-images-icons-and-png-backgrounds-1.png?fit=1000%2C1000&ssl=1&w=640" width="30" height="30" title="facebook"/></a></span><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_self"><img alt="Twitter" src="https://cdn.icon-icons.com/icons2/4029/PNG/512/twitter_x_new_logo_square_x_icon_256075.png" width="40" height="33" title="twitter"/></a></span><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com" target="_self"><img alt="Linkedin" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" width="30" height="30" title="linkedin"/></a></span><span class="icon" style="padding:0 5px 0 5px;"><a href="https://www.instagram.com" target="_self"><img alt="Instagram" src="https://static.vecteezy.com/system/resources/previews/018/930/415/original/instagram-logo-instagram-icon-transparent-free-png.png" width="30" height="30" title="instagram"/></a></span></div>
          `,})
    }
    Swal.fire({
        title: 'Success',
        text: 'Delete Booking Success',
        icon: 'success',
        confirmButtonText: 'OK'
        })
    await deleteBooking(bookingId, token);
    redirect('/mybookings') ;
  }