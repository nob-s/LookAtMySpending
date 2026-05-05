import type { Transaction } from "../model/Transaction.ts";
import { DisplayRow } from "./DisplayRow.tsx";

interface TransactionsDisplayProps {
  transactions: Transaction[];
}

const TransactionsDisplay: React.FC<TransactionsDisplayProps> = ({transactions}) => {
  function formatDate(date: Date): string {
    return [
      String(date.getDate()).padStart(2, '0'),
      String(date.getMonth() + 1).padStart(2, '0'),
      date.getFullYear()
    ].join('-');
  }

  function getNetAmount(transs: Transaction[]): number {
    return transs
      .map(trans => trans.amount)
      .reduce((a, b) => a + b, 0);
  }

  return (
    <div className="flex flex-col">
      {/* Headers */}
      <DisplayRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
       {/* All transactions */}
      {transactions.map(trans =>
        <DisplayRow date={formatDate(trans.date)} description={trans.description}
                    amount={String(trans.amount)} bank={trans.bank}/>
      )}
      {/* Sum of all transactions */}
      <DisplayRow date={"Total"} description={""} amount={String(getNetAmount(transactions).toFixed(2))} bank={""}/>
    </div>
  );
}
export default TransactionsDisplay