export class Transaction {
  date: Date;
  description: string;
  amount: number;
  bank: string;

  constructor(date: Date|string, description: string, amount: string, bank: string) {
    this.date = date instanceof Date ? date : this.getDate(date);
    this.description = description;
    this.amount = this.getAmount(amount);
    this.bank = bank;
  }

  private getDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private getAmount(amount: string): number {
    return Number(amount);
  }
}