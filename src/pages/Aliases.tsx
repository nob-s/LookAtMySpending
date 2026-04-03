import { useState } from "react";

interface AliasesProps {
  setHomeAliases: (aliases: Record<string, string>) => void
}

export function Aliases({setHomeAliases}: AliasesProps) {
  const [aliases, setAliases] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-col">
      <p>aliases</p>
      <button
      onClick={() => {setHomeAliases(aliases)}}>

      </button>
    </div>
  )
}

