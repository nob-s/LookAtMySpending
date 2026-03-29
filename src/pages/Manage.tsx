import type { Transaction } from "../model/Transaction.ts";
import TransactionsDisplay from "../modules/TransactionsDisplay.tsx";

interface ManageProps {
  allTransactions: Transaction[]
}

export function Manage({allTransactions}: ManageProps) {
  return (
    <div>
      <TransactionsDisplay transactions={allTransactions}/>
    </div>
  )
}