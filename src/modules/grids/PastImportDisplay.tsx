import type { TransactionImport } from "../../model/TransactionImport.ts";
import { useModelStore } from "../../store/useModelStore.ts";
import PastImportRow from "./PastImportRow.tsx";

export default function PastImportDisplay() {
  const allTransactions: TransactionImport[] = useModelStore(s => s.allTransactions);
  const removeTransactions = useModelStore(s => s.removeTransactions);

  return (
    <div className="flex flex-col gap-y-4">
      {allTransactions.map((imp) =>
        <PastImportRow tImport={imp} onDeleteImport={() => removeTransactions(imp.id)}/>
      )}
    </div>
  );
}