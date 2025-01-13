//This is used to display the Expense List table.
//This list contains all the expense details of the user.
//This is called in the Dashboard component and the Budget/expense screen.

import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expensesList, refreshData}) {
  const deleteExpense=async(expense)=>{
    const result=await db.delete(Expenses)
    .where(eq(Expenses.id,expense.id))
    .returning();
    if(result){
      toast('Expense Deleted!');
      refreshData();
    }
  }
  return (

    //Format of the Expense List Table
    <div className='mt-3'>
      <div className='grid grid-cols-4 bg-[#fea15f] p-2'>
        <h2 className='font-bold text-black'>Name</h2>
        <h2 className='font-bold'>Amount</h2>      
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
      </div>
      {(expensesList).map((expenses, index)=>(
        <div key={index} className='grid grid-cols-4 bg-[#ffede0] p-2'>
        <h2>{expenses.name}</h2>
        <h2>₹{expenses.amount}</h2>      
        <h2>{expenses.createdBy}</h2>
        <h2><Trash2 className='text-[#ff9553] cursor-pointer'
          onClick={()=>deleteExpense(expenses)}
        /></h2>
      </div>
      ))}
    </div>
  )
}

export default ExpenseListTable
