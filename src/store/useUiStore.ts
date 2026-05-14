import {create} from 'zustand'
import { persist } from "zustand/middleware";
import { useModelStore } from "./useModelStore.ts";

interface UiStoreState {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  toggleModal: () => void;

  isDarkMode: boolean;
  toggleDarkMode: () => void;

  groupFilter: string[];
  setGroupFilter: (groupFilter: string[]) => void;

  dateFilter: { start: string; end: string } | null;
  setDateFilter: (filter: { start: string; end: string } | null) => void;
}

export const useUiStore = create<UiStoreState>()(
  persist((set, get) => ({
      modalOpen: false,
      setModalOpen: (open) => set({ modalOpen: open }),
      toggleModal: () => set({ modalOpen: !get().modalOpen }),

      isDarkMode: true,
      toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),

      groupFilter: [...useModelStore.getState().categories, ""],
      setGroupFilter: (groupFilter) => set({ groupFilter }),

      dateFilter: null,
      setDateFilter: (filter) => set({ dateFilter: filter }),
    }),
    {name: 'ui-store'}
  )
)