export class Transaction {
  date: Date;
  description: string;
  amount: number;
  bank: string;
  alias: string;

  constructor(date: string, description: string, amount: string, bank: string) {
    this.date = this.getDate(date);
    this.description = description;
    this.amount = this.getAmount(amount);
    this.bank = bank;
    this.alias = "";
  }

  setAlias(alias: string): void {
    this.alias = alias;
  }

  private getDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private getAmount(amount: string): number {
    return Number(amount);
  }
}