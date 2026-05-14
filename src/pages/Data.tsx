import { CsvUploader } from "../modules/CsvUploader.tsx";
import DataDisplay from "../modules/grids/DataDisplay.tsx";
import { NewTabHyperlink } from "../modules/general/NewTabHyperlink.tsx";
import { useModelStore } from "../store/useModelStore.ts";
import MyButton from "../modules/general/MyButton.tsx";
import { JsonUploader } from "../modules/JsonUploader.tsx";
import { FileParser } from "../util/FileParser.ts";
import { MyFormat } from "../util/MyFormat.ts";
import type { Transaction } from "../model/Transaction.ts";



export function Data() {
  const addTransactionsToStore =
    useModelStore((s) => s.addTransactions)
  const tempTransactions =
    useModelStore((s) => s.tempTransactions)
  const setTempTransactions =
    useModelStore((s) => s.setTempTransactions)
  const updateTempTransactions =
    useModelStore((s) => s.updateTempTransactions);
  const allTransactions = useModelStore((s) => s.allTransactions);
  const setAllTransactions = useModelStore((s) => s.setTransactions);
  const aliases = useModelStore((s) => s.aliases);
  const setAliases = useModelStore((s) => s.setAliases);
  const categories = useModelStore((s) => s.categories);
  const setCategories = useModelStore((s) => s.setCategories);
  const initialAmount = useModelStore((s) => s.initialAmount);
  const setInitialAmount = useModelStore((s) => s.setInitialAmount);

  function addRowsAndClear() {
    if (tempTransactions.length === 0) { return }
    const groups: Record<string, Transaction[]> = tempTransactions.reduce(
      (acc: Record<string, Transaction[]>, trans: Transaction) => {
        const key: string = MyFormat.formatMonthYear(trans.date) + trans.bank;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(trans)
        return acc;
      }, {}
    );
    Object.values(groups).forEach((group) => addTransactionsToStore(group));
    setTempTransactions([])
  }
  /*
  Updates store from jsonString
   */
  function onJsonStringLoaded(jsonString: string): void {
    const newModelStore = FileParser.parseJsonStringToStore(jsonString);
    if (!newModelStore) {
      // TODO add warning when failed importing of save
      console.error("Failed to load store from JSON");
      return;
    }
    setAllTransactions(newModelStore.allTransactions);
    setTempTransactions(newModelStore.tempTransactions);
    setAliases(newModelStore.aliases);
    setCategories(newModelStore.categories);
    setInitialAmount(newModelStore.initialAmount);
  }
  /*
  Takes store objects, serializes them to json, and download
   */
  function serializeAndDownloadJson(): void {
    const jsonString: string = FileParser.serializeStoreToJsonString(
      allTransactions, tempTransactions, aliases, categories, initialAmount)
    FileParser.serializeJsonStringToJsonAndDownload(jsonString)
  }

  return (
    <div className="flex flex-1">
      {/* left bar */}
      <div className="
        flex flex-col max-h-full overflow-y-auto min-h-0
        px-4 py-3 gap-y-10 w-64
        border-r border-gray-500 dark:border-gray-500
        bg-white dark:bg-gray-800">
        {/*CSV Imports*/}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-wrap gap-x-1 text-sm">
            <p>Import your csv file taken from</p>
            <NewTabHyperlink link={"https://statementsensei.streamlit.app/"}/>
          </div>
          <CsvUploader onTransactionsLoaded={t => setTempTransactions(t)} />
          <MyButton onClick={addRowsAndClear} name="Add rows to all transactions" />
          <MyButton onClick={() => setTempTransactions([])} name="Clear imported data" />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Note: Uploading a CSV will automatically split the import by Bank and Month in the History tab
          </p>
        </div>
        {/*JSON Import*/}
        <div className="flex flex-col gap-y-2">
          <p>Import your json save file</p>
          <JsonUploader onJsonLoaded={onJsonStringLoaded} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            WARNING: Uploading a file INSTANTLY overrides all data. Use with CAUTION.
          </p>
        </div>
        {/*JSON Export*/}
        <div className="flex flex-col gap-y-2">
          <p>Export your json save file</p>
          <MyButton onClick={serializeAndDownloadJson} name="Download .json save file" />
        </div>
      </div>

      {/* main */}
      <div className="flex-1 overflow-y-auto p-2">
        { tempTransactions.length === 0
          ? <p className="text-sm">No transactions imported yet.</p>
          : <DataDisplay updateMethod={updateTempTransactions} transactions={tempTransactions} />
        }
      </div>
    </div>
  )
}

