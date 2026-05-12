import type { Transaction } from "../../model/Transaction.ts";
import ManageRow from "./ManageRow.tsx";
import { MyFormat } from "../../util/MyFormat.ts";
import { useModelStore } from "../../store/useModelStore.ts";
import type { TransactionImport } from "../../model/TransactionImport.ts";
import InitAmtRow from "./InitAmtRow.tsx";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

function getNetAmount(transs: Transaction[], initialAmount: number): number {
  return initialAmount + transs
    .map(trans => trans.amount)
    .reduce((a, b) => a + b, 0);
}

function mergeAllTransactions(transactions: TransactionImport[]): Transaction[] {
  return transactions.flatMap((i) => i.transactions);
}

export default function ManageDisplay() {
  const transactions = mergeAllTransactions(useModelStore(s => s.allTransactions));
  const updateTransaction =
    useModelStore((s) => s.updateTransaction);
  const initialAmount = useModelStore(s => s.initialAmount);

  const parentRef = useRef<HTMLDivElement>(null);
  const sorted = transactions
    .map((trans, flatIndex): [number, typeof trans] => [flatIndex, trans])
    .reverse()
    .toSorted((aa, bb) => {
      const a = aa[1];
      const b = bb[1];
      if (a.date.getMonth() !== b.date.getMonth() || a.date.getFullYear() != b.date.getFullYear()) {
        return b.date.getTime() - a.date.getTime();
      }
      if (a.bank != b.bank) {
        return a.bank.toLowerCase() > b.bank.toLowerCase() ? -1 : 1;
      }
      return b.date.getTime() - a.date.getTime();
    });
  const virtualizer = useVirtualizer({
    count: sorted.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
  });

  return (
    <div className="flex flex-col overflow-auto h-full" ref={parentRef}>
      {/* Headers */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800">
        <ManageRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
        <ManageRow date={""} description={"Total"} amount={MyFormat.formatAmount(getNetAmount(transactions, initialAmount))} bank={""}/>
        <ManageRow date={""} description={""} amount={""} bank={""}/>
      </div>
      {/* All transactions */}
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const [flatIndex, trans] = sorted[virtualItem.index];
          return (
            <div
              key={trans.id}
              style={{ position: 'absolute', top: virtualItem.start, width: '100%' }}
            >
              <ManageRow
                date={MyFormat.formatDate(trans.date)}
                description={trans.description}
                amount={trans.amount.toFixed(2)}
                bank={trans.bank}
                updateMethod={updateTransaction}
                transaction={trans}
                flatIndex={flatIndex}
              />
            </div>
          );
        })}
      </div>
      <InitAmtRow initAmt={initialAmount}/>
    </div>
  );
}