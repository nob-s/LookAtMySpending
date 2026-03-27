import type { Transaction } from "../model/Transaction.ts";

interface TransactionsDisplayProps {
  transactions: Transaction[];
}

export const TransactionsDisplay: React.FC<TransactionsDisplayProps> = ({transactions}) => {
  function formatDate(date: Date): string {
    return [
      String(date.getDate()).padStart(2, '0'),
      String(date.getMonth() + 1).padStart(2, '0'),
      date.getFullYear()
    ].join('-');
  }

  return (
    <div className="flex flex-col">
      {/* header */}
      <div className="grid grid-cols-[120px_1fr_100px_120px] font-semibold border-b border-gray-800 gap-x-2">
        <p className="border-r border-gray-600 p-2">Date</p>
        <p className="border-r border-gray-600 p-2">Description</p>
        <p className="border-r border-gray-600 p-2">Amount</p>
        <p className="border-r border-gray-600 p-2">Bank</p>
      </div>

      {transactions.map((trans, index) => (
        <div key={index} className="grid grid-cols-[120px_1fr_100px_120px] border-b border-gray-600 gap-x-2">
          <p className="border-r border-gray-600 p-2">{formatDate(trans.date)}</p>
          <p className="border-r border-gray-600 p-2">{trans.description}</p>
          <p className="border-r border-gray-600 p-2">{trans.amount}</p>
          <p className="border-r border-gray-600 p-2">{trans.bank}</p>
        </div>
      ))}
    </div>
  );
}