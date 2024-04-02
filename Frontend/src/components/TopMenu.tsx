import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-[50px] bg-fuchsia-700 flex flex-row fixed top-0 left-0 right-0 border-y-[1px] border-solid border-gray-500 z-30">
      <Image
        src={'/img/DentistLogo.png'}
        className="h-full w-auto"
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />
      <TopMenuItem
        title="Add new booking"
        imgSrc="/img/addBookIcon.png"
        pageRef="/dentists"
      />
      <TopMenuItem
        title="My Booking"
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
      <div className="absolute right-0 flex flex-column h-full">
        {session ? (
          <Link href="/api/auth/signout">
            <div
              className="flex items-center h-full
                px-2 text-cyan-600 text-sm text-white">
              Sign-Out of {session.user?.name}
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div
              className="flex items-center h-full
              px-2 text-cyan-600 text-sm text-white">
              Sign-In
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
