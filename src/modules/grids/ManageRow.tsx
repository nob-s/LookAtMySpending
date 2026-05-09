import { Transaction } from "../../model/Transaction.ts";
import { useEffect, useState } from "react";
import { useModelStore } from "../../store/useModelStore.ts";

interface MainRowProps {
  date: string;
  description: string;
  amount: string;
  bank: string;
  updateMethod?: (itemIndex: number, updated: Transaction) => void;
  transaction?: Transaction;
  flatIndex?: number;
}

export default function ManageRow({date, description, amount, bank, updateMethod, transaction, flatIndex}: MainRowProps) {
  const isEditable =
    updateMethod != undefined && transaction !== undefined && flatIndex !== undefined;
  const [rawDate, setRawDate] = useState(date);
  const [rawDescription, setRawDescription] = useState(description);
  const [isDescFocused, setIsDescFocused] = useState(false);
  const [rawAmount, setRawAmount] = useState(amount);
  useEffect(() => { setRawDate(date); }, [date]);
  useEffect(() => { setRawDescription(description); }, [description]);
  useEffect(() => { setRawAmount(amount); }, [amount]);
  const isInAliasView = useModelStore(s => s.isInAliasView)
  const aliases = useModelStore(s => s.aliases);

  function getBlurDesc(desc: string): string {
    if (!isInAliasView) { return desc; }
    let best: { phrase: string; alias: string } | null = null;
    for (const [phrase, alias] of Object.entries(aliases)) {
      if (description.toLowerCase().includes(phrase.toLowerCase())) {
        if (!best || phrase.length > best.phrase.length) {
          best = { phrase, alias };
        }
      }
    }
    return best ? best.alias : description;
  }

  return (isEditable
      ? <div className="
        w-full grid grid-cols-[120px_1fr_100px_120px]
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
        <input
          value={rawDate}
          onChange={e => setRawDate(e.target.value)}
          onBlur={(e) =>
            updateMethod(flatIndex!,
              new Transaction(e.target.value, transaction.description, transaction.amount.toFixed(2), transaction.bank))
          }
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm"/>
        <input
          value={isDescFocused ? rawDescription : getBlurDesc(rawDescription)}
          onChange={(e) => setRawDescription(e.target.value)}
          onFocus={() => setIsDescFocused(true)}
          onBlur={(e) => {
            setIsDescFocused(false)
            updateMethod(flatIndex!,
              new Transaction(transaction.date, e.target.value, String(transaction.amount), transaction.bank))
          }}
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm"/>
        <input
          value={rawAmount}
          onChange={(e) => setRawAmount(e.target.value)}
          onBlur={(e) =>
            updateMethod(flatIndex!,
              new Transaction(transaction.date, transaction.description, String(Number(e.target.value)), transaction.bank))
          }
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-right"/>
        <input
          value={bank}
          onChange={(e) =>
            updateMethod(flatIndex!,
              new Transaction(transaction.date, transaction.description, String(transaction.amount), e.target.value))
          }
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm"/>
      </div>

      : <div className="
        grid grid-cols-[120px_1fr_100px_120px]
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{date}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{description}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-right">{amount}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{bank}</p>
      </div>
  );
}