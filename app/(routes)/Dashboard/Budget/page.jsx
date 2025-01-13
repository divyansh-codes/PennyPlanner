//This is the main page for the Budget page in . 
//It will be displayed when the user navigates to the Budget page from the dashboard.

import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='p-10'>
    <h2 className='font-bold text-3xl'>My Budgets</h2>
    <BudgetList/>
</div>
  )
}

export default Budget