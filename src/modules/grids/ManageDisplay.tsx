import type { Transaction } from "../../model/Transaction.ts";
import ManageRow from "./ManageRow.tsx";
import { MyFormat } from "../../util/MyFormat.ts";

interface MainDisplayProps {
  transactions: Transaction[];
  updateMethod?: (itemIndex: number, updated: Transaction) => void;
}

function getNetAmount(transs: Transaction[]): number {
  return transs
    .map(trans => trans.amount)
    .reduce((a, b) => a + b, 0);
}

export default function ManageDisplay({transactions, updateMethod}: MainDisplayProps) {
  return (
    <div className="flex flex-col">
      {/* Headers */}
      <ManageRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
      {/* Sum of all transactions */}
      <ManageRow date={""} description={"Total"} amount={String(getNetAmount(transactions).toFixed(2))} bank={""}/>
       {/* All transactions */}
      {transactions.map((trans, flatIndex) =>
        <ManageRow date={MyFormat.formatDate(trans.date)} description={trans.description}
                   amount={trans.amount.toFixed(2)} bank={trans.bank}
                   updateMethod={updateMethod} transaction={trans} flatIndex={flatIndex}/>
      )}
    </div>
  );
}