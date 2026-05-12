import { useModelStore } from "../store/useModelStore.ts";
import ManageDisplay from "../modules/grids/ManageDisplay.tsx";

export function Manage() {
  const allTransactions = useModelStore((s) => s.allTransactions);

  return (
    <div className="flex-1 overflow-y-auto">
      { allTransactions.length === 0
        ? <p>No transactions imported yet.</p>
        : <ManageDisplay/>
      }
    </div>
  )
}