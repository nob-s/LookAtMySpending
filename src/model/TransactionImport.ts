import type { Transaction } from "./Transaction.ts";

export class TransactionImport {
  id: string;
  label: string;
  transactions: Transaction[];

  constructor(transactions: Transaction[], id?: string) {
    this.transactions = transactions;
    this.id = id ?? crypto.randomUUID();
    this.label = this.getYearMonthString();
  }

  private getYearMonthString(): string {
    if (this.transactions.length === 0) { return "No Transactions"; }
    const date = this.transactions[0].date;
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getFullYear() + " " + shortMonths[date.getMonth()];
  }
}