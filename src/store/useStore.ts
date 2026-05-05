import {create} from 'zustand'
import type { Transaction } from "../model/Transaction.ts";

interface StoreState {
  allTransactions: Record<string, Transaction[]>;
  setTransactions: (t: Record<string, Transaction[]>) => void;
  addTransactions: (dateString: string, newTransactions: Transaction[]) => void;
  removeTransactions: (dateString: string) => void;

  aliases: Record<string, string>;
  setAliases: (a: Record<string, string>) => void;
  addAlias: (phrase: string, alias: string) => void;
  removeAlias: (phrase: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  allTransactions: {},
  setTransactions: (t) => set({allTransactions: t}),
  addTransactions: (dateString, newTransactions) => set((state) => ({
    allTransactions: { ...state.allTransactions, [dateString]: newTransactions }
  })),
  removeTransactions: (dateString) => set((state) => {
    const allTransactions = { ...state.allTransactions };
    delete allTransactions[dateString];
    return { allTransactions };
  }),

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