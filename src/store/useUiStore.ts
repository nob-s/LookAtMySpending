import {create} from 'zustand'
import { persist } from "zustand/middleware";

interface UiStoreState {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  toggleModal: () => void;

  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useUiStore = create<UiStoreState>() (
  persist((set, get) => ({
    modalOpen: false,
    setModalOpen: (open) => set({ modalOpen: open }),
    toggleModal: () => set({ modalOpen: !get().modalOpen }),

    isDarkMode: true,
    toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
  }),
    {name: 'ui-store'}
  )
)