//This file Defines the layout of the dashboard page, which includes the SideNav and DashboardHeader components.
//It also checks if the user has any budgets or not, if not then it redirects the user to the budget page.

"use client"
import 'dotenv/config';
import DashboardHeader from '@/app/(routes)/Dashboard/_components/DashboardHeader'
import SideNav from '@/app/(routes)/Dashboard/_components/SideNav'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { budgets } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';

// Dashboard layout component
function Dashboardlayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  // useEffect hook to check user budgets when user changes
  useEffect(() => {
    user && checkUserBudgets();
  }, [user])

  // Function to check if the user has any budgets or not,
  // if not then redirect to budget page, and prompt user to create a budget.
  const checkUserBudgets = async () => {
    const result = await db.select()
      .from(budgets)
      .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if (result?.length == 0) {
      router.replace('/Dashboard/Budget')
    }
  }

  // Return the layout with SideNav and DashboardHeader components
  return (
    <div>
      <div className='fixed md:w-64 hidden md:block'>
        <SideNav />
      </div>
      <div className='md:ml-64 md:block'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout