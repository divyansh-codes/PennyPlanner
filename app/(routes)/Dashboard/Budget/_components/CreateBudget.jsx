//This page is used to create a new budget.
//The CreateBudget component is used to create a new budget. 
//It takes a refreshData prop to refresh the data after creating a new budget. 
//It uses the Dialog component from the UI library to create a dialog box.

"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();

  //The onCreateBudget function is used to create a new budget and display a banner after creating the budget.
  const onCreateBudget = async () => {
    const result = await db.insert(budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon
      }).returning({ insertedId: budgets.id })

    //refresh the data after creating a new budget and also display a toast-banner after creating the budget.
    if (result) {
      refreshData()
      toast('New Budget Created!')
    }
  }
  return (
    
    //The Dialog component is from shadcn-ui library.
    //This dialog box contains an input field to enter the budget name, 
    //an input field to enter the budget amount, and an emoji picker to select an emoji icon for the budget. 
    <Dialog>
      <DialogTrigger asChild>
        <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dotted
    cursor-pointer hover:shadow-md'>
          <h2 className='text-3xl'>+</h2>
          <h2>Create New Budget</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Budget</DialogTitle>
          <DialogDescription>
            <div className='mt-5'>
              <Button variant="outline"
                size="lg"
                className="text-lg"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
              <div className='absolute z-20'>
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)
                  }} />
              </div>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                <Input placeholder="For example - Snacks"
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                <Input type="number" placeholder="For example - ₹1000"
                  onChange={(e) => setAmount(e.target.value)} />
              </div>

            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button disabled={!(name && amount)}
              onClick={() => onCreateBudget()}
              className='mt-5 w-full'>Create Budget</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default CreateBudget
