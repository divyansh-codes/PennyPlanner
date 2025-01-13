//This page is the main component of the dashboard page, 
// it fetches the user's budgets and expenses and displays them in the form of cards and tables.

"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { budgets, Expenses } from '@/utils/schema';
import BudgetItem from './Budget/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  //useEffect hook to fetch budget list when user changes.
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
    getAllExpenses();
  }

  //used to fetch all expenses in for same user.
  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdBy: Expenses.createdBy
    }).from(budgets)
      .leftJoin(Expenses, eq(budgets.id, Expenses.budgetId))
      .where(eq(budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id))
    setExpensesList(result);
  }

  return (
    <div className='p-8'>
      <h2 className='font-semibold text-2xl'>Hi, {user?.firstName} 👋</h2>
      <p className='text-gray-500'>Let's see where your money went this time🤔!</p>

      {/* CardInfo component to display total budget, total expenses and remaining budget from CardInfo*/}
      <CardInfo budgetList={budgetList} />
      <div className='grid  grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='lg:col-span-2'>
          <h2 className='font-bold text-lg'> Your Expenses </h2>

          {/* ExpenseListTable component to display all expenses from ExpenseListTable*/}
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>

        {/* BudgetItem component to display all budgets from BudgetItem*/}
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'> Your Budgets </h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))} 
        </div>
      </div>
    </div>
  )
}

export default Dashboard