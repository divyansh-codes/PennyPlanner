//This page is used to create the side navigation bar for the dashboard page.
//It contains the menu list and the user profile section.

"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutDashboard, Wallet, BadgePlus, BadgeMinus, Building2 } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

//SideNav component, it gives the side navigation bar for the dashboard page.
function SideNav() {

  //Define the menu list with id, name, icon, and path.
  const menulist = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/Dashboard'
    },
    {
      id: 2,
      name: 'Budget',
      icon: Wallet,
      path: '/Dashboard/Budget'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: BadgeMinus,
      path: '/Dashboard/expenses'
    },
    {
      id: 4,
      name: 'About-us',
      icon: Building2,
      path: "/Dashboard/About-us"
    }
  ]

  //Get the current pathname to know the active page.
  const path = usePathname();

  return (
    <div className='h-screen p-3 border shadow-md'>
      <Link href='/Dashboard'>
        <Image src={'/logo.svg'}
          alt='logo'
          width={80}
          height={50}
        />
      </Link>
      <div className='mt-5'>
        {menulist.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className={`flex gap-3 items-center text-black font-medium p-5 mb-2 cursor-pointer rounded-md hover:text-white hover:bg-[#b097e6]
                ${path == menu.path && 'text-white bg-[#865ae4]'}
                `}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton />
        Profile
      </div>
    </div>
  )
}

export default SideNav
