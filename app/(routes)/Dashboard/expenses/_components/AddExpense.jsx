//This page is used to Add expenses to the budget.
//This page is displayed when the user clicks on a specific Budget from the Budget page.
//This page mainly contains the AddExpense component which is used to add new expenses to the budget.

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId , refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading,setloading]=useState(false);
    
    //used to add new expenses to the budget.
    const addNewExpense = async () => {
        setloading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdBy:moment().format('DD/MM/yyyy')
        }).returning({ insertedId: Expenses.id });
        setAmount('');
        setName('');
        if (result) {
            setloading(false)
            refreshData()
            toast('New Expense Added!');
        }
        setloading(false);
    };

    return (

        //This section of code defines the add expense form with it's fields and button.
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input placeholder="For example - Chips" value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input type='number' placeholder="For example - ₹20" value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button disabled={!(name && amount)||loading} 
                onClick={() => addNewExpense()} 
                className='mt-3 w-full'>
                    {loading?<Loader2 className='animate-spin'/>:"Add New Expense"}
            </Button>
        </div>
    );
}

export default AddExpense;
