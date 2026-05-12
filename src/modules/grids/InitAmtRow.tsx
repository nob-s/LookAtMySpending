import { useEffect, useState } from "react";
import { useModelStore } from "../../store/useModelStore.ts";
import { MyFormat } from "../../util/MyFormat.ts";

interface InitAmtRowProps {
  initAmt: number;
}

export default function InitAmtRow({ initAmt }: InitAmtRowProps) {
  const categories = useModelStore(s => s.categories);
  const setInitialAmount = useModelStore(s => s.setInitialAmount);
  const [raw, setRaw] = useState(MyFormat.formatAmount(initAmt));
  useEffect(() => { setRaw(MyFormat.formatAmount(initAmt)); }, [initAmt]);

  return (
    <div
      style={{ gridTemplateColumns: `120px 1fr 100px 120px ${categories.map(() => '100px').join(' ')}` }}
      className="grid border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"></p>
      <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800">Initial Amount</p>
      <input
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={(e) => setInitialAmount(Number(e.currentTarget.value.replace(/,/g, '')))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setInitialAmount(Number(e.currentTarget.value.replace(/,/g, '')));
            e.currentTarget.blur();
          }
          if (e.key === "Escape") {
            setRaw(MyFormat.formatAmount(initAmt));
          }
        }}
        className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm text-right bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"
      />
      <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"></p>
      {categories.map((cat) => (
        <p key={cat} className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm bg-white dark:bg-gray-700  group-hover:bg-gray-200 dark:group-hover:bg-gray-800"></p>
      ))}
    </div>
  );
}