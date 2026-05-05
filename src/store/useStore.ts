import {create} from 'zustand'
import type { Transaction } from "../model/Transaction.ts";
import { TransactionImport } from "../model/TransactionImport.ts";

interface StoreState {
  allTransactions: TransactionImport[];
  setTransactions: (t: TransactionImport[]) => void;
  addTransactions: (newTransactions: Transaction[]) => void;
  removeTransactions: (id: string) => void;

  aliases: Record<string, string>;
  setAliases: (a: Record<string, string>) => void;
  addAlias: (phrase: string, alias: string) => void;
  removeAlias: (phrase: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  allTransactions: [],
  setTransactions: (t) => set({allTransactions: t}),
  addTransactions: (newTransactions) => set((state) => ({
    allTransactions: [...state.allTransactions, new TransactionImport(newTransactions)],
  })),
  removeTransactions: (id) => set((state) => ({
    allTransactions: state.allTransactions.filter((i) => i.id !== id)
  })),

  aliases: {},
  setAliases: (a) => set({ aliases: a }),
  addAlias: (phrase, alias) => set((state) => ({
    aliases: { ...state.aliases, [phrase]: alias }
  })),
  removeAlias: (phrase) => set((state) => {
    const aliases = { ...state.aliases };
    delete aliases[phrase];
    return { aliases };
  }),

}))