import { useModelStore } from "../store/useModelStore.ts";
import PastImportDisplay from "../modules/grids/PastImportDisplay.tsx";

export default function PastImport() {
  const allTransactions = useModelStore((s) => s.allTransactions);

  return (
    <div className="flex-1 overflow-y-auto p-2">
      { allTransactions.length === 0
        ? <p>No transactions imported yet.</p>
        : <PastImportDisplay/>
      }
    </div>
  )
}
