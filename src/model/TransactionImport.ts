import type { Transaction } from "./Transaction.ts";

export class TransactionImport {
  id: string;
  label: string;
  transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.id = crypto.randomUUID();
    this.label = transactions[0].getYearMonthString();
    this.transactions = transactions;
  }
}