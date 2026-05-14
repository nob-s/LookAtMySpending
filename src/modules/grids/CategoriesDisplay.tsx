import MyButton from "../general/MyButton.tsx";
import { useModelStore } from "../../store/useModelStore.ts";
import EditableCell from "./EditableCell.tsx";
import { useState } from "react";
import { Transaction } from "../../model/Transaction.ts";
import { Calc } from "../../util/Calc.ts";

export default function CategoriesDisplay() {
  const [value, setValue] = useState("");
  const categories = useModelStore(s => s.categories);
  const addCategory = useModelStore(s => s.addCategory);
  const removeCategory = useModelStore(s => s.removeCategory);
  const updateCategory = useModelStore(s => s.updateCategory);
  const transactions = Calc.mergeAllTransactions(useModelStore(s => s.allTransactions));
  const updateTransaction = useModelStore(s => s.updateTransaction);

  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto p-1
    border-b border-gray-300 dark:border-gray-600">
      <input
        placeholder="Category Name"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded p-2 text-sm dark:bg-gray-700"
      />
      <MyButton name={"Add new Category"} onClick={() => {addCategory(value); setValue("");}}/>
      {
        categories.map((_, idx) =>
          <div className="flex gap-x-4 border border-gray-300 dark:border-gray-600">
            <EditableCell
              initial={categories[idx]}
              onCommit={(v) => {
                updateCategory(v, idx);
                transactions
                  .map((trans, flatIndex): [number, typeof trans] => [flatIndex, trans])
                  .filter(([, trans]) => trans.category === categories[idx])
                  .forEach(([flatIndex, trans]) => updateTransaction(
                    flatIndex,
                    new Transaction(trans.date, trans.description, String(trans.amount), trans.bank, v)
                  ));
              }}/>
            <MyButton name={"Delete Category"} onClick={() => removeCategory(idx)} className="text-sm"/>
          </div>)
      }
    </div>
  );
}
