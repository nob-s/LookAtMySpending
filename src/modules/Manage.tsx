import { CsvUploader } from "./CsvUploader.tsx";
import type { Transaction } from "../model/Transaction.ts";
import { useState } from "react";
import { TransactionsDisplay } from "./TransactionsDisplay.tsx";

export function Manage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  function handleTransactionsLoaded(transactions: Transaction[]) {
    setTransactions(transactions);
  }

  return (
    <div className="flex h-full">
      {/*left bar*/}
      <div className="flex flex-col px-4 gap-y-1 border-r-2 border-gray-600 rounded-r-xl">
        {/*text*/}
        <div className="flex py-1 gap-x-1 text-sm">
          <p>Upload your csv file taken from</p>
          <a href="https://github.com/benjamin-awd/StatementSensei?tab=readme-ov-file" className="text-blue-700 underline">here</a>
        </div>
        <CsvUploader onTransactionsLoaded={handleTransactionsLoaded}/>
      </div>
      {/*main stuff*/}
      <TransactionsDisplay transactions={transactions} />
    </div>
  )
}

