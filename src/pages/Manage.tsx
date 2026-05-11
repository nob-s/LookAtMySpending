import { useModelStore } from "../store/useModelStore.ts";
import ManageDisplay from "../modules/grids/ManageDisplay.tsx";

export function Manage() {
  const allTransactions = useModelStore((s) => s.allTransactions);
  const updateTransaction =
    useModelStore((s) => s.updateTransaction);
  return (
    <div className="flex-1 overflow-y-auto px-2">
      { allTransactions.length === 0
        ? <p>No transactions imported yet.</p>
        : <ManageDisplay updateMethod={updateTransaction} />
      }
    </div>
  )
}