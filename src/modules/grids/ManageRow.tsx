import { Transaction } from "../../model/Transaction.ts";
import { useEffect, useState } from "react";
import { useModelStore } from "../../store/useModelStore.ts";
import EditableCell from "./EditableCell.tsx";
import type { TransactionImport } from "../../model/TransactionImport.ts";
import { MyFormat } from "../../util/MyFormat.ts";

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
  const [rawDescription, setRawDescription] = useState(description);
  const [isDescFocused, setIsDescFocused] = useState(false);
  useEffect(() => { setRawDescription(description); }, [description]);

  const isInAliasView = useModelStore(s => s.isInAliasView)
  const aliases = useModelStore(s => s.aliases);

  const categories = useModelStore(s => s.categories);

  const allTransactions = useModelStore(s => s.allTransactions);

  function getAliasedDesc(desc: string): string {
    let best: { phrase: string; alias: string } | null = null;
    for (const [phrase, alias] of Object.entries(aliases)) {
      if (desc.toLowerCase().includes(phrase.toLowerCase())) {
        if (!best || phrase.length > best.phrase.length) {
          best = { phrase, alias };
        }
      }
    }
    return best ? best.alias : desc;
  }

  function mergeAllTransactions(transactions: TransactionImport[]): Transaction[] {
    return transactions.flatMap((i) => i.transactions);
  }

  return (isEditable
      ? <div
        style={{ gridTemplateColumns:
            `120px 1fr 100px 120px ${categories!.map(() => '100px').join(' ')}`
        }}
        className="
          grid border-b border-gray-300 dark:border-gray-600
          hover:bg-gray-100 dark:hover:bg-gray-700">
        <EditableCell
          initial={date}
          onCommit={(v) => updateMethod(
            flatIndex!,
            new Transaction(v, transaction.description, transaction.amount.toFixed(2), transaction.bank))}
        />
        <input
          value={isDescFocused
            ? rawDescription
            : isInAliasView
            ? getAliasedDesc(rawDescription)
            : rawDescription}
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
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm"/>
        <EditableCell
          initial={MyFormat.formatAmount(transaction.amount)}
          onCommit={(v) => updateMethod(
            flatIndex!,
            new Transaction(transaction.date, transaction.description, String(Number(v.replace(/,/g, ''))), transaction.bank))}
        />
        <EditableCell
          initial={bank}
          onCommit={(v) => updateMethod(
            flatIndex!,
            new Transaction(transaction.date, transaction.description, String(transaction.amount), v))}
        />
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => {
              mergeAllTransactions(allTransactions)
                .map((trans, flatIndex): [number, typeof trans] => [flatIndex, trans])
                .filter(([, trans]) =>
                  getAliasedDesc(trans.description) === getAliasedDesc(transaction.description))
                .forEach(([flatIndex, trans]) => updateMethod(
                  flatIndex!,
                  new Transaction(trans.date, trans.description, String(trans.amount),
                    trans.bank, category === transaction.category ? "" : category)
                ))
            }}
            className="border-r border-gray-300 dark:border-gray-600 p-1 flex items-center justify-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={category === transaction.category}
              readOnly
              className="w-4 h-4 pointer-events-none"
            />
          </div>
        ))}
      </div>

      : <div
        style={{ gridTemplateColumns:
          `120px 1fr 100px 120px ${categories!.map(() => '100px').join(' ')}`
        }}
        className="
          grid border-b border-gray-300 dark:border-gray-600
          hover:bg-gray-100 dark:hover:bg-gray-700">
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{date}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{description}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-right">{amount}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{bank}</p>
        {categories.map((category) => (
          <p key={category} className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-center">
            {bank !== "" && date !== "" ? category : ""}
          </p>
        ))}
      </div>
  );
}