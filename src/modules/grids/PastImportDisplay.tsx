import type { TransactionImport } from "../../model/TransactionImport.ts";
import { useModelStore } from "../../store/useModelStore.ts";
import PastImportRow from "./PastImportRow.tsx";

export default function PastImportDisplay() {
  const allTransactions: TransactionImport[] = useModelStore(s => s.allTransactions);

  return (
    <div className="flex flex-col gap-y-4">
      {allTransactions.map((imp) =>
        <PastImportRow tImport={imp}/>
      )}
    </div>
  );
}