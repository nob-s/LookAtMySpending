import { useState } from "react";
import { Topbar } from "../modules/Topbar.tsx";
import { ImportData } from "./ImportData.tsx";
import { Aliases } from "./Aliases.tsx";
import { Manage } from "./Manage.tsx";

export function Home() {
  const WINDOW_MANAGE = "manage"
  const WINDOW_ALIASES = "aliases"
  const WINDOW_IMPORT_DATA = "import_data"

  const [mainWindow, setMainWindow] = useState(WINDOW_IMPORT_DATA)

  return (
    <div className="flex flex-col h-screen
      bg-white dark:bg-gray-700
      text-black dark:text-white">
      <Topbar
        setWindowManage={() => setMainWindow(WINDOW_MANAGE)}
        setWindowAliases={() => setMainWindow(WINDOW_ALIASES)}
        setWindowImportData={() => setMainWindow(WINDOW_IMPORT_DATA)}/>
      <div className="flex-1 flex min-h-0">
        {mainWindow === WINDOW_ALIASES && <Aliases/>}
        {mainWindow === WINDOW_MANAGE && <Manage/>}
        {mainWindow === WINDOW_IMPORT_DATA && <ImportData/>}
      </div>
    </div>
  )
}

