//This page is used for displaying the list of budgets. 
//It is a child component of the Budget page.
//It fetches the list of budgets from the database and displays them in a grid layout. 
//It also includes a CreateBudget component that allows the user to create a new budget.

"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  // useEffect hook to fetch budget list when user changes
  useEffect(() => {
    user && getBudgetList();
  }, [user])

  //used to fetch budget list from DB for same user.
  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(budgets),
      totalSpend: sql`sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    }).from(budgets)
      .leftJoin(Expenses, eq(budgets.id, Expenses.budgetId))
      .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(budgets.id)
      .orderBy(desc(budgets.id));
    setBudgetList(result);
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

        {/*CreateBudget component to create a new budget*/}
        <CreateBudget refreshData={() => getBudgetList()} />

        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))

          //Loading animation
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-ful bg-slate-300 rounded-lg h-[150px] animate-pulse'>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BudgetList
