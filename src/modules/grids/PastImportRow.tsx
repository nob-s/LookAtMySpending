import type { TransactionImport } from "../../model/TransactionImport.ts";
import ImportRow from "./ImportRow.tsx";
import { MyFormat } from "../../util/MyFormat.ts";
import Button from "../general/Button.tsx";

interface PastImportRowProps {
  tImport: TransactionImport;
  onDeleteImport: () => void;
}

export default function PastImportRow( {tImport, onDeleteImport}: PastImportRowProps ) {
  const sliceVal = 2;
  const firstFew = tImport.transactions.slice(0, sliceVal)
  const lastFew = tImport.transactions.slice(tImport.transactions.length - sliceVal, tImport.transactions.length)
  return (
    <div className="
      flex gap-x-4 items-center
      border-t border-b border-gray-500 dark:border-gray-500 text-xs">
      <div className="flex flex-col w-full">
        {
          firstFew.map((t) => (
            <ImportRow date={MyFormat.formatDate(t.date)} description={t.description}
                       amount={t.amount.toFixed(2)} bank={t.bank}/>
          ))
        }
        <ImportRow date={"..."} description={"..."} amount={"..."} bank={"..."}/>
        {
          lastFew.map((t) => (
            <ImportRow date={MyFormat.formatDate(t.date)} description={t.description}
                       amount={t.amount.toFixed(2)} bank={t.bank}/>
          ))
        }
      </div>
      <div className="ml-auto h-full">
        <Button name={"Delete import"} onClick={onDeleteImport}/>
      </div>
    </div>
  )
}