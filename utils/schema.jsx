// Description: This file contains the schema for the database tables.

import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

//This is the schema for the budgets table.
export const budgets=pgTable('budgets',{
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull(),
    icon:varchar('icon'),
    id:serial('id').primaryKey(),
    createdBy:varchar('createdBy').notNull()
})

//This is the schema for the expenses table.
export const Expenses=pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull(),
    budgetId:integer('budgetId').references(()=>budgets.id),
    createdBy:varchar('createdby').notNull()
})