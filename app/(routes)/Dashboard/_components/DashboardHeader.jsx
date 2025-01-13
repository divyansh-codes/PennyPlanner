//This page defines the header of the dashboard page. 
//It includes the Title and the user button.

import React from 'react'
import { UserButton } from '@clerk/nextjs'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div>
        <h1 className='font-sans text-center font-bold flex-grow text-4xl'>
          <span className='text-[#865ae4]'>Penny</span> <span className='text-[#FF7917]'>Planner</span>
        </h1>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardHeader
