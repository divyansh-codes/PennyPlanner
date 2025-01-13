//This is the page where user can see all the expenses he has made in the past.

"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '@/utils/dbConfig';
import { budgets, Expenses } from '@/utils/schema';
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function expenses() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
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

  //used to fetch all expenses for same user.
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

    <div className='p-10'>
      <h2 className='font-bold text-lg'> Your Expenses </h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getBudgetList()}
      />
    </div>
  )
}

export default expenses
