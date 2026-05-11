import type { Transaction } from "../../model/Transaction.ts";
import DataRow from "./DataRow.tsx";
import { MyFormat } from "../../util/MyFormat.ts";

interface ImportDisplayProps {
  transactions: Transaction[];
  updateMethod?: (itemIndex: number, updated: Transaction) => void;
}

function getNetAmount(transs: Transaction[]): number {
  return transs
    .map(trans => trans.amount)
    .reduce((a, b) => a + b, 0);
}

export default function DataDisplay({transactions, updateMethod}: ImportDisplayProps) {
  return (
    <div className="flex flex-col">
      {/* Headers */}
      <DataRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
      {/* Sum of all transactions */}
      <DataRow date={""} description={"Total"} amount={String(getNetAmount(transactions).toFixed(2))} bank={""}/>
      <DataRow date={"|"} description={""} amount={""} bank={""}/>
      {/* All transactions */}
      {transactions.map((trans, flatIndex) =>
        <DataRow date={MyFormat.formatDate(trans.date)} description={trans.description}
                 amount={trans.amount.toFixed(2)} bank={trans.bank}
                 updateMethod={updateMethod} transaction={trans} flatIndex={flatIndex}/>
      )}
    </div>
  );
}