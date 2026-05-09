import type { Transaction } from "../model/Transaction.ts";
import { useModelStore } from "../store/useModelStore.ts";
import type { TransactionImport } from "../model/TransactionImport.ts";
import MainDisplay from "../modules/grids/MainDisplay.tsx";

function mergeAllTransactions(transactions: TransactionImport[]): Transaction[] {
  return transactions.flatMap((i) => i.transactions);
}

export function Manage() {
  const allTransactions = useModelStore((s) => s.allTransactions);
  const updateTransaction =
    useModelStore((s) => s.updateTransaction);
  return (
    <div className="flex-1 overflow-y-auto p-2">
      { allTransactions.length === 0
        ? <p>No transactions imported yet.</p>
        : <MainDisplay updateMethod={updateTransaction} transactions={mergeAllTransactions(allTransactions)} />
      }
    </div>
  )
}