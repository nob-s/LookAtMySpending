import type { Transaction } from "../model/Transaction.ts";
import TransactionsDisplay from "../modules/TransactionsDisplay.tsx";

interface ManageProps {
  allTransactions: Record<string, Transaction[]>
}

function mergeAllTransactions(transactions: Record<string, Transaction[]>): Transaction[] {
  return Object.values(transactions).flat();
}

export function Manage({allTransactions}: ManageProps) {
  return (
    <div>
      <TransactionsDisplay transactions={mergeAllTransactions(allTransactions)} />
    </div>
  )
}