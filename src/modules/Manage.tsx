import { CsvUploader } from "./CsvUploader.tsx";
import type { Transaction } from "../model/Transaction.ts";
import { useState } from "react";
import TransactionsDisplay from "./TransactionsDisplay.tsx";

export function Manage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  function handleTransactionsLoaded(transactions: Transaction[]) {
    setTransactions(transactions);
  }

  return (
    <div className="flex flex-1">
      {/*left bar*/}
      <div className="
      flex flex-col max-h-full overflow-y-auto min-h-0
      px-4 gap-y-1
      border-r-2 border-gray-600 rounded-r-xl">
        {/*text*/}
        <div className="flex py-1 gap-x-1 text-sm">
          <p>Upload your csv file taken from</p>
          <a href="https://statementsensei.streamlit.app/"
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-700 underline">
            here
          </a>
        </div>
        <CsvUploader onTransactionsLoaded={handleTransactionsLoaded}/>
      </div>

      {/*main stuff*/}
      <div className="flex-1 overflow-y-auto">
        <TransactionsDisplay transactions={transactions} />
      </div>
    </div>
  )
}

