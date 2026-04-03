import { CsvUploader } from "../modules/CsvUploader.tsx";
import type { Transaction } from "../model/Transaction.ts";
import { useState } from "react";
import TransactionsDisplay from "../modules/TransactionsDisplay.tsx";
import { NewTabHyperlink } from "../modules/NewTabHyperlink.tsx";

interface ButtonProps {
  name: string,
  onClick: () => void,
}

export const Button = ({name, onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      color="red"
      className="
      border-2 rounded-xl p-2 w-full
      border-gray-600 dark:border-gray-200
      hover:bg-gray-200 hover:dark:bg-gray-700
      active:bg-gray-400 active:dark:bg-gray-900
      transition-all duration-150">
      {name}
    </button>
  )
}

interface ImportDataProps {
  handleAddRows: (date: string, transactions: Transaction[]) => void,
}

export function ImportData({handleAddRows}: ImportDataProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function addRowsAndClear() {
    handleAddRows(new Date().toString(), transactions)
    setTransactions([])
  }

  return (
    <div className="flex flex-1">
      {/*left bar*/}
      <div className="
      flex flex-col max-h-full overflow-y-auto min-h-0
      px-4 gap-y-2
      border-r-3 border-gray-600 rounded-r-xl"
      >
        {/* Uploader */}
        <div className="flex py-1 gap-x-1 text-sm">
          <p>Upload your csv file taken from</p>
          <NewTabHyperlink link={"https://statementsensei.streamlit.app/"}/>
        </div>
        <CsvUploader onTransactionsLoaded={transactions => setTransactions(transactions)} />
        {/*Functions*/}
        <Button
          onClick={addRowsAndClear}
          name="Add rows to all transactions"
        />
        <Button
          onClick={() => setTransactions([])}
          name="Clear imported data"
        />
      </div>

      {/*main stuff*/}
      <div className="flex-1 overflow-y-auto">
        <TransactionsDisplay transactions={transactions} />
      </div>
    </div>
  )
}

