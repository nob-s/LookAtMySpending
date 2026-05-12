import type { Transaction } from "../../model/Transaction.ts";
import ManageRow from "./ManageRow.tsx";
import { MyFormat } from "../../util/MyFormat.ts";
import { useModelStore } from "../../store/useModelStore.ts";
import type { TransactionImport } from "../../model/TransactionImport.ts";
import InitAmtRow from "./InitAmtRow.tsx";

interface MainDisplayProps {
  updateMethod: (itemIndex: number, updated: Transaction) => void;
}

function getNetAmount(transs: Transaction[], initialAmount: number): number {
  return initialAmount + transs
    .map(trans => trans.amount)
    .reduce((a, b) => a + b, 0);
}

function mergeAllTransactions(transactions: TransactionImport[]): Transaction[] {
  return transactions.flatMap((i) => i.transactions);
}

export default function ManageDisplay({updateMethod}: MainDisplayProps) {
  const transactions = mergeAllTransactions(useModelStore(s => s.allTransactions));
  const initialAmount = useModelStore(s => s.initialAmount);

  return (
    <div className="flex flex-col">
      {/* Headers */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800">
        <ManageRow date={"Date"} description={"Description"} amount={"Amount"} bank={"Bank"}/>
        <ManageRow date={""} description={"Total"} amount={MyFormat.formatAmount(getNetAmount(transactions, initialAmount))} bank={""}/>
        <ManageRow date={""} description={""} amount={""} bank={""}/>
      </div>
      {/* All transactions */}
      {transactions
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
        })
        .map((item) => {
          const trans = item[1];
          const flatIndex = item[0];
          return <ManageRow key={trans.id} date={MyFormat.formatDate(trans.date)} description={trans.description}
                           amount={trans.amount.toFixed(2)} bank={trans.bank}
                           updateMethod={updateMethod} transaction={trans} flatIndex={flatIndex}/>
        }
      )}
      <InitAmtRow initAmt={initialAmount}/>
    </div>
  );
}