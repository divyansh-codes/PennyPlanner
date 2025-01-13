//This component is used to display the budget item in the dashboard and the Budget page.
//It displays the budget name, total amount, total spend, and remaining amount with a progress bar.

import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {

    //Function to calculate the progress percentage of the budget for the progress bar.
    const calculateProgressPerc=()=>{
        const perc=(budget.totalSpend/budget.amount)*100;
        return perc.toFixed(2);
    }

  return (
    
    //Link to the budget page with the budget id to make the card clickable and will lead to the exact budget page.
    <Link href={'/Dashboard/expenses/'+budget?.id} >
        <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-2 px-4 bg-[#f7ece3] rounded-full'>
                        {budget.icon}</h2>
                    <div>
                        <h2 className='font-bold'>{budget.name}</h2>
                        <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                </div>
            </div>
            <h2 className='font-bold text-primary text-lg'>₹{budget.amount}</h2>
        </div>
        <div className='mt-5'> 
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-xs text-slate-400'>
                    ₹{budget.totalSpend?budget.totalSpend:0} Spend</h2>
                <h2 className='text-xs text-slate-400'>
                ₹{budget.amount-budget.totalSpend} Remaining</h2>
            </div>
            {/*Progress bar to show the budget progress.*/}
            <div className='w-full bg-[#ffdac0] h-2 rounded-full'>
                <div className=' bg-[#fea15f] h-2 rounded-full'
                style={{
                    width:`${calculateProgressPerc()}%`
                }}
                >
                </div>
            </div>
        </div>
        </div>
    </Link>
  )
}

export default BudgetItem
