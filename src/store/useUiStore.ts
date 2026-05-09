import {create} from 'zustand'

interface UiStoreState {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  toggleModal: () => void;
}

export const useUiStore =
  create<UiStoreState>((set, get) => ({
    modalOpen: false,
    setModalOpen: (open) => set({ modalOpen: open }),
    toggleModal: () => set({ modalOpen: !get().modalOpen }),
}))