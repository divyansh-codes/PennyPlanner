//This component is used to display the total budget, total spend and number of budgets in the dashboard.
//It takes the budgetList as a prop and calculates the total budget and total spend from the budgetList.
//It then displays the total budget, total spend and number of budgets in a card format.
//If the budgetList is not available, it displays a loading animation.

import { FileChartPie, ListOrdered, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  // useEffect hook to calculate card info when budgetList changes
  useEffect(() => {
    if (Array.isArray(budgetList)) {
      CalculateCardInfo(budgetList);
    } else {
      console.error("budgetList is not an array:", budgetList);
    }
  }, [budgetList]);

  //Function to calculate total budget and total spend from budgetList
  const CalculateCardInfo = (budgetList) => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach(element => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    console.log(totalBudget_, totalSpend_);
  };

  return (
    <div>
    {budgetList?
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {/*Card to display total budget*/}
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Total Budget</h2>
          <h2 className='font text-2xl'>₹{totalBudget}</h2>
        </div>
        <Wallet className='bg-[#FF7917] p-3 h-12 w-12 rounded-full text-white' />
      </div>

      {/*Card to display total spend*/}
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Total Spend</h2>
          <h2 className='font text-2xl'>₹{totalSpend}</h2>
        </div>
        <FileChartPie className='bg-[#FF7917] p-3 h-12 w-12 rounded-full text-white' />
      </div>

      {/*Card to display number of budgets*/}
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Number of Budgets</h2>
          <h2 className='font text-2xl'>{budgetList?.length}</h2>
        </div>
        <ListOrdered className='bg-[#FF7917] p-3 h-12 w-12 rounded-full text-white' />
      </div>
    </div>
    :
    //Loading Animation
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {[1,2,3].map((item,index)=>(
        <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'>

        </div>
      ))}
    </div>
    }
    </div>
  );
}

export default CardInfo;
