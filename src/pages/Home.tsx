import { useState } from "react";
import { Topbar } from "../modules/Topbar.tsx";

export function Home() {
  const tabs = [];
  const [getMainWindow, setMainWindow] = useState(0)
  return (
    <>
      <div className="flex flex-col">
        <Topbar/>
      </div>
    </>
  )
}

