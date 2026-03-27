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
    <div className="flex flex-col
      bg-white dark:bg-gray-600 h-screen
      text-black dark:text-white">
      <Topbar setWindowManage={setWindowManage} setWindowAliases={setWindowAliases} />
      <div className="flex flex-col h-full">
        {mainWindow === WINDOW_MANAGE && <Manage/>}
        {mainWindow === WINDOW_ALIASES && <Aliases/>}
      </div>
    </div>
  )
}

