import { CsvUploader } from "../modules/CsvUploader.tsx";
import TransactionsDisplay from "../modules/TransactionsDisplay.tsx";
import { NewTabHyperlink } from "../modules/general/NewTabHyperlink.tsx";
import { useStore } from "../store/useStore.ts";

interface ButtonProps {
  name: string,
  onClick: () => void,
}

export const Button = ({name, onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        border-2 rounded-xl p-2 w-full
        border-gray-500 dark:border-gray-500
        hover:bg-gray-200 dark:hover:bg-gray-700
        active:bg-gray-400 dark:active:bg-gray-900
        transition-all duration-150">
      {name}
    </button>
  )
}

export function ImportData() {
  const addTransactionsToStore =
    useStore((s) => s.addTransactions)
  const tempTransactions =
    useStore((s) => s.tempTransactions)
  const setTempTransactions =
    useStore((s) => s.setTempTransactions)
  const updateTempTransactions =
    useStore((s) => s.updateTempTransactions);

  function addRowsAndClear() {
    if (tempTransactions.length === 0) { return }
    addTransactionsToStore(tempTransactions);
    setTempTransactions([])
  }

  return (
    <div className="flex flex-1">
      {/* left bar */}
      <div className="
        flex flex-col max-h-full overflow-y-auto min-h-0
        px-4 py-3 gap-y-3 w-64
        border-r border-gray-500 dark:border-gray-500
        bg-white dark:bg-gray-800">
        <div className="flex flex-wrap gap-x-1 text-sm">
          <p>Upload your csv file taken from</p>
          <NewTabHyperlink link={"https://statementsensei.streamlit.app/"}/>
        </div>
        <CsvUploader onTransactionsLoaded={t => setTempTransactions(t)} />
        <Button onClick={addRowsAndClear} name="Add rows to all transactions" />
        <Button onClick={() => setTempTransactions([])} name="Clear imported data" />
      </div>

      {/* main */}
      <div className="flex-1 overflow-y-auto p-4">
        { tempTransactions.length === 0
          ? <p className="text-sm">No transactions imported yet.</p>
          : <TransactionsDisplay updateMethod={updateTempTransactions} transactions={tempTransactions} />
        }
      </div>
    </div>
  )
}

