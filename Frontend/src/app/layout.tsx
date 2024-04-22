import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from '@/providers/NextAuthProvider'
import ReduxProvider from '@/redux/ReduxProvider'
import Image from 'next/image'
// import PopupCommentNRating from '@/components/PopupCommentNRating'
// import React, {useState, createContext} from 'react'

const inter = Inter({ subsets: ['latin'] })

// type ContextValueType = {
//   popUpBoolean: boolean;
//   setPopUpBoolean: React.Dispatch<React.SetStateAction<boolean>>;
// };
// export const Context = createContext<ContextValueType | undefined>(undefined);

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const nextAuthSession = await getServerSession(authOptions);
  // const [popUpBoolean,setPopUpBoolean] = useState<boolean>(false)
  // const contextValue = {
  //   popUpBoolean,
  //   setPopUpBoolean,
  // };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession}>
            <TopMenu/>
            <Image
              src="/img/dentistbg.jpg"
              alt="cover"
              fill={true}
              className="object-cover absolute top-0 left-0 w-full h-full -z-10 opacity-50"/>
            {/* <Context.Provider value={contextValue}> */}
              {children}
              {/* <PopupCommentNRating visible={popUpBoolean}></PopupCommentNRating>              
            </Context.Provider> */}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
