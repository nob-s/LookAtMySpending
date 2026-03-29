import { useState } from "react";
import { Topbar } from "../modules/Topbar.tsx";
import { ImportData } from "./ImportData.tsx";
import { Aliases } from "./Aliases.tsx";

export function Home() {
  const WINDOW_MANAGE = "manage"
  const WINDOW_ALIASES = "aliases"
  const WINDOW_IMPORT_DATA = "import_data"

  const [mainWindow, setMainWindow] = useState(WINDOW_MANAGE)

  function setWindowManage() {
    setMainWindow(WINDOW_MANAGE);
  }
  function setWindowAliases() {
    setMainWindow(WINDOW_ALIASES);
  }
  function setWindowImportData() {
    setMainWindow(WINDOW_IMPORT_DATA);
  }

  return (
    <div className="flex flex-col h-screen
      bg-white dark:bg-gray-600
      text-black dark:text-white">
      <Topbar setWindowManage={setWindowManage}
              setWindowAliases={setWindowAliases}
              setWindowImportData={setWindowImportData}/>
      <div className="flex-1 flex min-h-0">
        {mainWindow === WINDOW_IMPORT_DATA && <ImportData/>}
        {mainWindow === WINDOW_ALIASES && <Aliases/>}
      </div>
    </div>
  )
}

