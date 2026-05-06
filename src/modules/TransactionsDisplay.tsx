import type { Transaction } from "../model/Transaction.ts";
import { DisplayRow } from "./DisplayRow.tsx";
import { useState } from "react";

interface TransactionsDisplayProps {
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

const TransactionsDisplay: React.FC<TransactionsDisplayProps> = ({transactions, updateMethod}) => {
  return (
    <div className="flex flex-col">
      {/* Headers */}
      <DisplayRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
       {/* All transactions */}
      {transactions.map((trans, flatIndex) =>
        <DisplayRow date={formatDate(trans.date)} description={trans.description}
                    amount={trans.amount.toFixed(2)} bank={trans.bank}
                    updateMethod={updateMethod} transaction={trans} flatIndex={flatIndex}/>
      )}
      {/* Sum of all transactions */}
      <DisplayRow date={"Total"} description={""} amount={String(getNetAmount(transactions).toFixed(2))} bank={""}/>
    </div>
  );
}
export default TransactionsDisplay