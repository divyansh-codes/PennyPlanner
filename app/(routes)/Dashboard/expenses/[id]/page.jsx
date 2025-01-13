//This is the page where user can see the expenses he has made in the past in specific budget this 
//This page also gives the option to delete the budget and all the expenses related to it.

"use client"
import { db } from '@/utils/dbConfig';
import { budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../Budget/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function ExpensesScreen({ params }) {
    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [budgetId, setBudgetId] = useState(null);
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();

    //Fetch budgetId from params
    useEffect(() => {
        params.then((resolvedParams) => {
            setBudgetId(resolvedParams.id);
        });
    }, [params]);

    //Fetch budget info and expenses list when user and budgetId are available
    useEffect(() => {
        user && budgetId && getBudgetInfo();
    }, [user, budgetId]);

    //Gives us budget information and the total expenses occurred in the budget from the DB.
    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(budgets),
            totalSpend: sql`sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(budgets)
            .leftJoin(Expenses, eq(budgets.id, Expenses.budgetId))
            .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(budgets.id, budgetId))
            .groupBy(budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList(); // Fetch expenses list after updating budget info
    };

    //This is used to fetch the expenses list from the DB.
    const getExpensesList = async () => {
        const resolvedParams = await params;
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, resolvedParams.id))
            .orderBy(desc(Expenses.id));
        console.log(result);
        setExpensesList(result); // Update expensesList state with fetched data
    };

    //gives us the option to delete the budget and all the expenses related to it.
    const deleteBudget = async () => {
        const resolvedParams = await params;
        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, resolvedParams.id))
            .returning();

        if (deleteExpenseResult) {
            const result = await db.delete(budgets)
                .where(eq(budgets.id, resolvedParams.id))
                .returning();
        }
        toast('Budget Deleted!');
        route.replace('/Dashboard/Budget')
    }

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses

                {/* Delete Budget Button using the Alert Dialog Component from shadcn library*/}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2" variant="destructive">
                            <Trash2 />Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Do you want to delete this Budget?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action CANNOT be undone. This will permanently DELETE your current Budget and all its Expenses,
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>

                {/* Budget Item Component with the functionality to add expense to the Budget */}
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
                )}
                <AddExpense budgetId={budgetId} user={user} refreshData={() => getBudgetInfo()} />
            </div>
            <div className='mt-4'>

                {/* used to fetch expense list for the specific budget */}
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    );
}

export default ExpensesScreen;
