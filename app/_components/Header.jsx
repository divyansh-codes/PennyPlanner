//This is file discribes the header of the application. It contains the logo of the application, the name of the application 
//and a button that allows the user to get started this button changes with the user's picture when the user is signed in.
//The page is styled using Tailwind CSS classes.

"use client"
import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
function Header() {
  const { user, isSignedIn } = useUser();
  return (

    //The div tag below contains the logo, which is also a link to the Dashboard page and the name of the application and the button that allows the user to get started.
    <div className='p-5 flex justify-between items-center border shadow-md'>
      <Link href='/Dashboard'>
        <Image src={'./logo.svg'}
          alt='logo'
          width={50}
          height={50}
          style={{ cursor: 'pointer' }}
        />
      </Link>

      {/* The h1 tag below contains the Get started Button. */}
      <h1 className='font-sans text-center font-bold flex-grow text-4xl'><span className='text-[#865ae4]'>Penny</span> <span className='text-[#FF7917]'>Planner</span></h1>
      {isSignedIn ?
        <UserButton /> :
        <Link href={'/sign-in'}>
          <Button>Get started</Button>
        </Link>
      }
    </div>
  )
}

export default Header
