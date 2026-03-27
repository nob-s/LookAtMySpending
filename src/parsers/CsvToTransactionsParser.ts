import { Transaction } from "../model/Transaction.ts";

export class CsvToTransactionsParser {
  static parseCsvToTransactions(file: File): Promise<Array<Transaction>> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        try {
          const text = e.target?.result as string;
          const rows = text
            .split("\n")
            .map(row => row.split(","));

          const transactions = rows.slice(1, -1).map(row => {
            const date = row[0];
            const desc = row[1];
            const amt = row[2];
            const bank = row[3];
            return new Transaction(date, desc, amt, bank);
          });

          resolve(transactions); // resolve the Promise with the data
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = err => reject(err);
      reader.readAsText(file);
    });
  }
}