import type { Transaction } from "../../model/Transaction.ts";
import ManageRow from "./ManageRow.tsx";
import { MyFormat } from "../../util/MyFormat.ts";
import { useModelStore } from "../../store/useModelStore.ts";
import InitAmtRow from "./InitAmtRow.tsx";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Calc } from "../../util/Calc.ts";
import { useUiStore } from "../../store/useUiStore.ts";

function getNetAmount(transs: Transaction[], initialAmount: number, groupFilter: string[], categories: string[]): number {
  return (categories.every(cat => groupFilter.includes(cat)) ? initialAmount : 0)
    + transs
    .filter(trans => groupFilter.includes(trans.category))
    .map(trans => trans.amount)
    .reduce((a, b) => a + b, 0);
}

export default function ManageDisplay() {
  const categories = useModelStore(s => s.categories);
  const transactions = Calc.mergeAllTransactions(useModelStore(s => s.allTransactions));
  const updateTransaction =
    useModelStore((s) => s.updateTransaction);
  const initialAmount = useModelStore(s => s.initialAmount);
  const groupFilter = useUiStore(s => s.groupFilter);
  const setGroupFilter = useUiStore(s => s.setGroupFilter);

  const parentRef = useRef<HTMLDivElement>(null);
  const sorted = transactions
    .map((trans, flatIndex): [number, typeof trans] => [flatIndex, trans])
    .filter(([, trans]) => groupFilter.includes(trans.category))
    .reverse()
    .toSorted((aa, bb) => {
      const a = aa[1];
      const b = bb[1];
      if (a.date.getMonth() !== b.date.getMonth() || a.date.getFullYear() != b.date.getFullYear()) {
        return b.date.getTime() - a.date.getTime();
      }
      return b.date.getTime() - a.date.getTime();
    });
  // TODO Update virtualizer?
  const virtualizer = useVirtualizer({
    count: sorted.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28.833,
    measureElement: el => el.getBoundingClientRect().height, // fixes drift
    overscan: 100,
    paddingEnd: 30
  });

  const categoryColWidths = categories.map(name =>
    Math.max(40, name.length * 8 + 16) + 'px'
  );
  const colTemplate = `120px 1fr 100px 90px ${categoryColWidths.join(' ')}`;
  const filterColTemplate = `1fr 70px 120px ${categoryColWidths.join(' ')}`

  return (
    <div className="flex flex-col overflow-auto h-full" ref={parentRef}>
      {/* Headers */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800">
        {/* Filter toolbar*/}
        <div className="grid py-2 text-sm border border-gray-300 dark:border-gray-600"
             style={{ gridTemplateColumns: filterColTemplate }}>
          <p className="text-right px-6">Filter by: </p>
          <div className=" flex border border-gray-300 dark:border-gray-600">
            <p className="text-right px-2">All</p>
            <button
              onClick={() => setGroupFilter(categories.every(cat => groupFilter.includes(cat))
                ? []
                : [...categories, ""]
              )}
              className={`px-1 text-center w-full ${categories.every(cat => groupFilter.includes(cat))
                ? "text-blue-500"
                : "text-gray-300 hover:text-gray-500"}`}>
              ▼
            </button>
          </div>
          <div className="flex border border-gray-300 dark:border-gray-600">
            <p className="text-right px-2">Ungrouped</p>
            <button
              onClick={() => setGroupFilter(
                groupFilter.includes("")
                  ? groupFilter.filter(c => c !== "")
                  : [...groupFilter, ""]
              )}
              className={`px-1 text-center w-full ${groupFilter.includes("")
                ? "text-blue-500"
                : "text-gray-300 hover:text-gray-500"}`}>
              ▼
            </button>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setGroupFilter(
                groupFilter.includes(cat)
                  ? groupFilter.filter(c => c !== cat)
                  : [...groupFilter, cat]
              )}
              className={`px-1 text-center border border-gray-300 dark:border-gray-600 ${groupFilter.includes(cat) 
                ? "text-blue-500" 
                : "text-gray-300 hover:text-gray-500"}`}
            >
              ▼
            </button>
          ))}
        </div>
        <ManageRow colTemplate={colTemplate} date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
        <ManageRow colTemplate={colTemplate} date={""} description={"Total"} amount={MyFormat.formatAmount(getNetAmount(transactions, initialAmount, groupFilter, categories))} bank={""}/>
        <ManageRow colTemplate={colTemplate} date={""} description={""} amount={""} bank={""}/>
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
                colTemplate={colTemplate}
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
        <div style={{ position: 'absolute', top: virtualizer.getTotalSize() - 30, width: '100%' }}>
          {
            categories.every(cat => groupFilter.includes(cat)) &&
            <InitAmtRow colTemplate={colTemplate} initAmt={initialAmount}/>
          }
        </div>
      </div>
    </div>
  );
}