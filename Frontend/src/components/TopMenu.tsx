import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-16 bg-white flex flex-row fixed top-0 left-0 right-0 border-b-[1px] border-solid border-gray-500 z-30 bg-opacity-80">
      <Image
        src={'/img/DentistLogo2.jpg'}
        className="h-full w-auto"
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />
      <TopMenuItem
        title="Home"
        imgSrc="/img/homelogo.png"
        pageRef="/"
      />
      {session?.user.role == "receptionist" ? null :
        <TopMenuItem
        title="Add new booking"
        imgSrc="/img/addBookIcon.png"
        pageRef="/dentists"
      />
      }
      <TopMenuItem
        title={session?.user.role == "receptionist" ? "Bookings" : "My Booking"}
        imgSrc="/img/bookingIcon.png"
        pageRef="/mybookings"
      />
      {!session ? (
        <TopMenuItem
          title="Sign up"
          imgSrc="/img/userInfoIcon.png"
          pageRef="/api/auth/register"
        />
      ) : null}
      <div className="absolute right-3 top-3 flex flex-column h-full">
        {session ? (
          <Link href="/api/auth/signout" style={{textDecoration:'none', fontSize:'20px'}} className='flex items-center h-10 border-2 rounded-lg border-cyan-500 w-auto shadow-lg p-2
          text-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-white'>
            <div>
              Sign-Out of {session.user.name}
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin" style={{textDecoration:'none', fontSize:'20px'}} className='flex items-center h-10 border-2 rounded-lg border-cyan-500 w-28 shadow-lg
          text-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-white'>
            <div>
              Sign-In
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
