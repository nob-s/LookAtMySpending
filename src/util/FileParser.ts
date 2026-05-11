import { Transaction } from "../model/Transaction.ts";
import { TransactionImport } from "../model/TransactionImport.ts";

export class FileParser {
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
            let amt = row[2];
            let bank = row[3];

            if (Number.isNaN(Number(amt))) {
              amt = bank;
              bank = "";
            }

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

  /*
  Takes json file and returns json string
   */
  static parseJsonToJsonString(jsonFile: File): Promise<string> {
    return jsonFile.text();
  }

  /*
  Takes json string, convert to json, and download
   */
  static serializeJsonStringToJsonAndDownload(jsonString: string): void {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `financials_save.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  /*
  Takes store objects and returns jsonString
   */
  static serializeStoreToJsonString(
    allTransactions: TransactionImport[], tempTransactions: Transaction[],
    aliases: Record<string, string>, categories: string[]): string {
    const payload = {
      allTransactions: allTransactions.map(ti => ({
        id: ti.id,
        label: ti.label,
        transactions: ti.transactions.map(t => ({
          date: t.date.toISOString(), // explicit, don't rely on stringify's default
          description: t.description,
          amount: t.amount,
          bank: t.bank,
          category: t.category,
        }))
      })),
      tempTransactions: tempTransactions.map(t => ({
        date: t.date.toISOString(),
        description: t.description,
        amount: t.amount,
        bank: t.bank,
        category: t.category,
      })),
      aliases,
      categories,
    }

    return JSON.stringify(payload, null, 2);
  }

  /*
  Takes jsonString and returns store objects
   */
  static parseJsonStringToStore(jsonString: string): {
    allTransactions: TransactionImport[];
    tempTransactions: Transaction[];
    aliases: Record<string, string>;
    categories: string[];
  } | null {
    type RawTransaction = {
      date: string;       // ISO string, not Date yet
      description: string;
      amount: number;     // number, not string yet
      bank: string;
      category: string;
    }

    type RawTransactionImport = {
      id: string;
      label: string;
      transactions: RawTransaction[];
    }

    type RawPayload = {
      allTransactions: RawTransactionImport[];
      tempTransactions: RawTransaction[];
      aliases: Record<string, string>;
      categories: string[];
    }

    try {
      const parsed = JSON.parse(jsonString) as RawPayload;

      const allTransactions: TransactionImport[] = parsed.allTransactions.map((ti: RawTransactionImport) => {
        const transactions = ti.transactions.map((t: RawTransaction) =>
          new Transaction(t.date, t.description, String(t.amount), t.bank, t.category)
        );
        return new TransactionImport(transactions, ti.id);
      });

      const tempTransactions: Transaction[] = parsed.tempTransactions.map((t: RawTransaction) =>
        new Transaction(t.date, t.description, String(t.amount), t.bank, t.category)
      );

      return { allTransactions, tempTransactions, aliases: parsed.aliases, categories: parsed.categories };

    } catch (e) {
      console.error("Failed to parse JSON", e);
      return null;
    }
  }
}
