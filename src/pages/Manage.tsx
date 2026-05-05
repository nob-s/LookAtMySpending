import type { Transaction } from "../model/Transaction.ts";
import TransactionsDisplay from "../modules/TransactionsDisplay.tsx";
import { useStore } from "../store/useStore.ts";
import type { TransactionImport } from "../model/TransactionImport.ts";

function mergeAllTransactions(transactions: TransactionImport[]): Transaction[] {
  return transactions.flatMap((i) => i.transactions);
}

export function Manage() {
  const allTransactions = useStore((s) => s.allTransactions);
  const updateTransaction =
    useStore((s) => s.updateTransaction);
  return (
    <div className="">
      { allTransactions.length === 0
        ? <p>No transactions imported yet.</p>
        : <TransactionsDisplay updateMethod={updateTransaction} transactions={mergeAllTransactions(allTransactions)} />
      }
    </div>
  )
}