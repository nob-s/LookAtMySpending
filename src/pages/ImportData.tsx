import { CsvUploader } from "../modules/CsvUploader.tsx";
import ImportDisplay from "../modules/grids/ImportDisplay.tsx";
import { NewTabHyperlink } from "../modules/general/NewTabHyperlink.tsx";
import { useModelStore } from "../store/useModelStore.ts";
import Button from "../modules/general/Button.tsx";



export function ImportData() {
  const addTransactionsToStore =
    useModelStore((s) => s.addTransactions)
  const tempTransactions =
    useModelStore((s) => s.tempTransactions)
  const setTempTransactions =
    useModelStore((s) => s.setTempTransactions)
  const updateTempTransactions =
    useModelStore((s) => s.updateTempTransactions);

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
      <div className="flex-1 overflow-y-auto p-2">
        { tempTransactions.length === 0
          ? <p className="text-sm">No transactions imported yet.</p>
          : <ImportDisplay updateMethod={updateTempTransactions} transactions={tempTransactions} />
        }
      </div>
    </div>
  )
}

