import type { Transaction } from "../model/Transaction.ts";
import TransactionsDisplay from "../modules/TransactionsDisplay.tsx";
import { useStore } from "../store/useStore.ts";

function mergeAllTransactions(transactions: Record<string, Transaction[]>): Transaction[] {
  return Object.values(transactions).flat();
}

export function Manage() {
  const allTransactions = useStore((s) => s.allTransactions);
  return (
    <div>
      <TransactionsDisplay transactions={mergeAllTransactions(allTransactions)} />
    </div>
  )
}