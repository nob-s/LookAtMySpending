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
        border-b border-gray-600
        group hover:bg-gray-200">
      <p className="border-r border-gray-600 p-2">{date}</p>
      <p className="border-r border-gray-600 p-2">{description}</p>
      <p className="border-r border-gray-600 p-2">{amount}</p>
      <p className="border-r border-gray-600 p-2">{bank}</p>
    </div>
  );
}