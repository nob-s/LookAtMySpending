import { useState } from "react";
import { Topbar } from "../modules/Topbar.tsx";
import { Manage } from "../modules/Manage.tsx";
import { Aliases } from "../modules/Aliases.tsx";

export function Home() {
  const WINDOW_MANAGE = "manage"
  const WINDOW_ALIASES = "aliases"

  const [mainWindow, setMainWindow] = useState(WINDOW_MANAGE)

  function setWindowManage() {
    setMainWindow(WINDOW_MANAGE);
  }
  function setWindowAliases() {
    setMainWindow(WINDOW_ALIASES);
  }

  return (
    <div className="flex flex-col h-screen
      bg-white dark:bg-gray-600
      text-black dark:text-white">
      <Topbar setWindowManage={setWindowManage} setWindowAliases={setWindowAliases} />
      <div className="flex-1 flex min-h-0">
        {mainWindow === WINDOW_MANAGE && <Manage/>}
        {mainWindow === WINDOW_ALIASES && <Aliases/>}
      </div>
    </div>
  )
}

