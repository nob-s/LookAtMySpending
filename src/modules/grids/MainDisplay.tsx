import type { Transaction } from "../../model/Transaction.ts";
import MainRow from "./MainRow.tsx";

interface MainDisplayProps {
  transactions: Transaction[];
  updateMethod?: (itemIndex: number, updated: Transaction) => void;
}

function formatDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function getNetAmount(transs: Transaction[]): number {
  return transs
    .map(trans => trans.amount)
    .reduce((a, b) => a + b, 0);
}

export default function MainDisplay({transactions, updateMethod}: MainDisplayProps) {
  return (
    <div className="flex flex-col">
      {/* Headers */}
      <MainRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
       {/* All transactions */}
      {transactions.map((trans, flatIndex) =>
        <MainRow date={formatDate(trans.date)} description={trans.description}
                 amount={trans.amount.toFixed(2)} bank={trans.bank}
                 updateMethod={updateMethod} transaction={trans} flatIndex={flatIndex}/>
      )}
      {/* Sum of all transactions */}
      <MainRow date={"Total"} description={""} amount={String(getNetAmount(transactions).toFixed(2))} bank={""}/>
    </div>
  );
}