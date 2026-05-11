export class Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  bank: string;
  category: string;

  constructor(date: Date|string, description: string, amount: string, bank: string, category: string = "") {
    this.id = crypto.randomUUID()
    this.date = date instanceof Date ? date : this.getDate(date);
    this.description = description;
    this.amount = this.getAmount(amount);
    this.bank = bank;
    this.category = category;
  }

  private getDate(date: string): Date {
    const datePart = date.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private getAmount(amount: string): number {
    return Number(amount);
  }
}