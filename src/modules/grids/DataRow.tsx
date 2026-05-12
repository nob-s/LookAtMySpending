import { Transaction } from "../../model/Transaction.ts";
import { useEffect, useState } from "react";
import { useModelStore } from "../../store/useModelStore.ts";
import EditableCell from "./EditableCell.tsx";
import { MyFormat } from "../../util/MyFormat.ts";

interface ImportRowProps {
  date: string;
  description: string;
  amount: string;
  bank: string;
  updateMethod?: (itemIndex: number, updated: Transaction) => void;
  transaction?: Transaction;
  flatIndex?: number;
}

export default function DataRow({date, description, amount, bank, updateMethod, transaction, flatIndex}: ImportRowProps) {
  const isEditable =
    updateMethod != undefined && transaction !== undefined && flatIndex !== undefined;
  const [rawDescription, setRawDescription] = useState(description);
  const [isDescFocused, setIsDescFocused] = useState(false);
  useEffect(() => { setRawDescription(description); }, [description]);

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
        border-b border-gray-300 dark:border-gray-600 group
        ">
        <EditableCell
          initial={date}
          onCommit={(v) => updateMethod(
            flatIndex!,
            new Transaction(v, transaction.description, transaction.amount.toFixed(2), transaction.bank))}
          className="bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"
        />
        <input
          value={isDescFocused ? rawDescription : getBlurDesc(rawDescription)}
          onChange={(e) => setRawDescription(e.target.value)}
          onFocus={() => setIsDescFocused(true)}
          onBlur={(e) => {
            setIsDescFocused(false)
            updateMethod(flatIndex!,
              new Transaction(transaction.date, e.target.value, String(transaction.amount), transaction.bank))
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateMethod(flatIndex!, new Transaction(transaction.date, e.currentTarget.value, String(transaction.amount), transaction.bank));
              e.currentTarget.blur();
            }
            if (e.key === "Escape") {
              setRawDescription(description);
            }
          }}
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm
          bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"/>
        <EditableCell
          initial={MyFormat.formatAmount(transaction.amount)}
          onCommit={(v) => updateMethod(
            flatIndex!,
            new Transaction(transaction.date, transaction.description, String(Number(v.replace(/,/g, ''))), transaction.bank))}
          className="text-right bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"
        />
        <EditableCell
          initial={bank}
          onCommit={(v) => updateMethod(
            flatIndex!,
            new Transaction(transaction.date, transaction.description, String(transaction.amount), v))}
          className="bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"
        />
      </div>

      : <div className="
        grid grid-cols-[120px_1fr_100px_120px]
        border-b border-gray-300 dark:border-gray-600
        group">
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800">{date}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800">{description}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-right bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800">{amount}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800">{bank}</p>
      </div>
  );
}