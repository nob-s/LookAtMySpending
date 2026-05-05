import * as React from "react";

interface DisplayRowProps {
  date: string;
  description: string;
  amount: string;
  bank: string;
}

export const DisplayRow: React.FC<DisplayRowProps> = ({date, description, amount, bank}) => {
  return (
    <div className="
        grid grid-cols-[120px_1fr_100px_120px] gap-x-2
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
      <p className="border-r border-gray-300 dark:border-gray-600 p-2 text-sm">{date}</p>
      <p className="border-r border-gray-300 dark:border-gray-600 p-2 text-sm">{description}</p>
      <p className="border-r border-gray-300 dark:border-gray-600 p-2 text-sm text-right">
        {Number(amount).toFixed(2)}
      </p>
      <p className="border-r border-gray-300 dark:border-gray-600 p-2 text-sm">{bank}</p>
    </div>
  );
}