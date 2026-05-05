import * as React from "react";
import { Transaction } from "../model/Transaction.ts";
import { useEffect, useState } from "react";

interface DisplayRowProps {
  date: string;
  description: string;
  amount: string;
  bank: string;
  updateMethod?: (itemIndex: number, updated: Transaction) => void;
  transaction?: Transaction;
  flatIndex?: number;
}

export const DisplayRow: React.FC<DisplayRowProps> = ({date, description, amount, bank, updateMethod, transaction, flatIndex}) => {
  const isEditable =
    updateMethod != undefined && transaction !== undefined && flatIndex !== undefined;
  const [rawDate, setRawDate] = useState(date);
  const [rawAmount, setRawAmount] = useState(amount);
  useEffect(() => { setRawDate(date); }, [date]);
  useEffect(() => { setRawAmount(amount); }, [amount]);

  return (isEditable
      ? <div className="
        grid grid-cols-[120px_1fr_100px_120px] gap-x-2
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
        <input
          value={rawDate}
          onChange={e => setRawDate(e.target.value)}
          onBlur={(e) =>
            updateMethod(flatIndex!,
              new Transaction(e.target.value, transaction.description, transaction.amount.toFixed(2), transaction.bank))
        } className="w-full min-w-0 bg-transparent p-1 text-sm"/>
        <input value={description} onChange={(e) =>
          updateMethod(flatIndex!,
            new Transaction(transaction.date, e.target.value, String(transaction.amount), transaction.bank))
        } className="w-full min-w-0 bg-transparent p-1 text-sm"/>
        <input
          value={rawAmount}
          onChange={(e) => setRawAmount(e.target.value)}
          onBlur={(e) =>
            updateMethod(flatIndex!,
              new Transaction(transaction.date, transaction.description, String(Number(e.target.value)), transaction.bank))
        } className="w-full min-w-0 bg-transparent p-1 text-sm text-right"/>
        <input value={bank} onChange={(e) =>
          updateMethod(flatIndex!,
            new Transaction(transaction.date, transaction.description, String(transaction.amount), e.target.value))
        } className="w-full min-w-0 bg-transparent p-1 text-sm"/>
      </div>

      : <div className="
        grid grid-cols-[120px_1fr_100px_120px] gap-x-2
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{date}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{description}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-right">{amount}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{bank}</p>
      </div>
  );
}