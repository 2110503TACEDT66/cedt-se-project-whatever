import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopMenu from '@/components/TopMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import NextAuthProvider from '@/providers/NextAuthProvider';
import ReduxProvider from '@/redux/ReduxProvider';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession}>
            <TopMenu />
            <div className='flex flex-row fixed top-0 left-0 right-0 w-full h-full -z-10'>
              <Image
                src="/img/dentistbg.png"
                alt="cover"
                fill={true}
                sizes="100vw"
                className="object-cover w-full h-full opacity-50 blur-[6px]"
              />              
            </div>
            {/* <Context.Provider value={contextValue}> */}
            {children}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
