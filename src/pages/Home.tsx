import { useEffect, useState } from "react";
import { Topbar } from "../modules/Topbar.tsx";
import { Data } from "./Data.tsx";
import { Labels } from "./Labels.tsx";
import { Manage } from "./Manage.tsx";
import { useUiStore } from "../store/useUiStore.ts";
import PastImport from "./PastImport.tsx";

export function Home() {
  const WINDOW_MANAGE = "manage"
  const WINDOW_LABELS = "labels"
  const WINDOW_IMPORT_DATA = "import_data"
  const WINDOW_PAST_IMPORTS = "past_imports"

  const [mainWindow, setMainWindow] = useState(WINDOW_IMPORT_DATA)

  const isDarkMode = useUiStore(s => s.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col h-screen
      bg-white dark:bg-gray-700
      text-black dark:text-white">
      <Topbar
        setWindowManage={() => setMainWindow(WINDOW_MANAGE)}
        setWindowLabels={() => setMainWindow(WINDOW_LABELS)}
        setWindowImportData={() => setMainWindow(WINDOW_IMPORT_DATA)}
        setWindowPastImports={() => setMainWindow(WINDOW_PAST_IMPORTS)}/>
      <div className="flex-1 flex min-h-0">
        {mainWindow === WINDOW_LABELS && <Labels/>}
        {mainWindow === WINDOW_MANAGE && <Manage/>}
        {mainWindow === WINDOW_IMPORT_DATA && <Data/>}
        {mainWindow === WINDOW_PAST_IMPORTS && <PastImport/>}
      </div>
    </div>
  )
}

