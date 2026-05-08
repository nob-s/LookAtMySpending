import {create} from 'zustand'
import type { Transaction } from "../model/Transaction.ts";
import { TransactionImport } from "../model/TransactionImport.ts";

interface StoreState {
  allTransactions: TransactionImport[];
  setTransactions: (t: TransactionImport[]) => void;
  updateTransaction: (flatIndex: number, updated: Transaction) => void;
  addTransactions: (newTransactions: Transaction[]) => void;
  removeTransactions: (id: string) => void;

  tempTransactions: Transaction[];
  setTempTransactions: (t: Transaction[]) => void;
  updateTempTransactions: (itemIndex: number, updated: Transaction) => void;

  aliases: Record<string, string>;
  setAliases: (a: Record<string, string>) => void;
  updateAlias: (newPhrase: string, oldPhrase: string, alias: string) => void;
  addAlias: (phrase: string, alias: string) => void;
  removeAlias: (phrase: string) => void;
}

function findImportAndItem(allTransactions: TransactionImport[], flatIndex: number): [number, number] {
  let remaining = flatIndex;
  for (let i = 0; i < allTransactions.length; i++) {
    if (remaining < allTransactions[i].transactions.length) {
      return [i, remaining];
    }
    remaining -= allTransactions[i].transactions.length;
  }
  throw new Error("Index out of bounds");
}

export const useModelStore = create<StoreState>((set) => ({
  allTransactions: [],
  setTransactions: (t) => set({allTransactions: t}),
  updateTransaction: (flatIndex, updated) => set((state) => {
    const allTransactions = [...state.allTransactions];
    const [importIndex, itemIndex] = findImportAndItem(allTransactions, flatIndex);
    const transactions = [...allTransactions[importIndex].transactions];
    transactions[itemIndex] = updated;
    allTransactions[importIndex] = new TransactionImport(transactions, allTransactions[importIndex].id);
    return { allTransactions };
  }),
  addTransactions: (newTransactions) => set((state) => ({
    allTransactions: [...state.allTransactions, new TransactionImport(newTransactions)],
  })),
  removeTransactions: (id) => set((state) => ({
    allTransactions: state.allTransactions.filter((i) => i.id !== id)
  })),

  tempTransactions: [],
  setTempTransactions: (t) => set({tempTransactions: t}),
  updateTempTransactions: (itemIndex, updated) => set((state) => {
    const tempTransactions = [...state.tempTransactions]
    tempTransactions[itemIndex] = updated;
    return { tempTransactions }
  }),

  aliases: {},
  setAliases: (a) => set({ aliases: a }),
  updateAlias: (oldPhrase, newPhrase, alias) => set(state => {
    const aliases = { ...state.aliases };
    delete aliases[oldPhrase];
    aliases[newPhrase] = alias;
    return { aliases };
  }),
  addAlias: (phrase, alias) => set((state) => ({
    aliases: { ...state.aliases, [phrase]: alias }
  })),
  removeAlias: (phrase) => set((state) => {
    const aliases = { ...state.aliases };
    delete aliases[phrase];
    return { aliases };
  }),
}))