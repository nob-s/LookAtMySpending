import {create} from 'zustand'

interface UiStoreState {
  colWidths: number[];
  startResize: (colIndex: number, startX: number, page: "manageColWidths" | "importColWidths") => void;
}

export const useUiStore =
  create<UiStoreState>((set, get) => ({
    colWidths: [120, 300, 100, 120],

    startResize: (colIndex: number, startX: number) => {
      const startWidth = colWidths[colIndex];

      const onMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - startX;
        setColWidths(prev => {
          const next = [...prev];
          next[colIndex] = Math.max(40, startWidth + delta); // 40px minimum
          return next;
        });
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
}))