import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenuItem({
  title,
  imgSrc,
  pageRef,
}: {
  title : string ;
  imgSrc: string;
  pageRef: string;
}) {
  const session = await getServerSession(authOptions);
  return (
    <Link
      href={pageRef}>
         <div
              className="flex items-center h-full
                px-2 text-sm ml-3"
                data-testid={title}>
              <Image 
                className="h-6 w-6"
                src={imgSrc} 
                alt={title} 
                width={0}
                height={0}/>
              <div className={`m-2 font-body font-medium ${session?.user.role == "receptionist" ? "text-rose-400":"text-cyan-500"} text-lg`}>{title}</div>
          </div>
    </Link>
  );
}
