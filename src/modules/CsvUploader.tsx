import { type ChangeEvent, useState } from "react";
import { Calc } from "../util/Calc.ts";
import { CsvToTransactionsParser } from "../parsers/CsvToTransactionsParser.ts";
import type { Transaction } from "../model/Transaction.ts";
import * as React from "react";

interface FileUploaderProps {
  onTransactionsLoaded: (transactions: Transaction[]) => void;
}

export const CsvUploader: React.FC<FileUploaderProps> = ({onTransactionsLoaded}) => {
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length <= 0) { return; }

    const file = e.target.files[0];

    if (!file.name.endsWith(".csv")) {
      alert("File does not have a .csv extension!");
      return;
    }

    setFile(file);

    try {
      const trans: Array<Transaction> = await CsvToTransactionsParser.parseCsvToTransactions(file);
      onTransactionsLoaded(trans);
    } catch (err) {
      alert("Failed to parse CSV: " + err);
    }
  }

  return (
    <div>
      <input
        onChange={handleFileChange}
        type="file"
        accept=".csv"
        className="
        border-gray-200 border-2
        block text-sm file:mr-4 file:py-1 file:px-1
        file:rounded file:border-2 file:border-gray-600
        file:text-sm file:font-semibold
        file:bg-gray-200 file:text-gray-700
        hover:file:bg-gray-400" />
      {file && (
        <div className="pl-1">
          <p>Size: {Calc.bytesToFileSize(file.size)}</p>
        </div>
      )}
    </div>
  )
}