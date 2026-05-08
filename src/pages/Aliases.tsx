import { useModelStore } from "../store/useModelStore.ts";
import Button from "../modules/general/Button.tsx";
import AliasDisplay from "../modules/grids/AliasDisplay.tsx";
import { useState } from "react";
import Modal from "../modules/general/Modal.tsx";

export function Aliases() {
  const addAliasToStore = useModelStore((s) => s.addAlias)
  const [modalOpen, setModalOpen] = useState(false)

  function handleConfirm(phrase: string, alias: string): void {
    if (phrase && alias) {
      addAliasToStore(phrase, alias)
      setModalOpen(false)
    }
  }
  return (
    <div className="flex flex-1">
      {/* Popup */}
      <Modal enable={modalOpen} handleCancel={() => setModalOpen(false)} handleConfirm={handleConfirm}/>
      {/* left bar */}
      <div className="
        flex flex-col max-h-full overflow-y-auto min-h-0
        px-4 py-3 gap-y-3 w-64
        border-r border-gray-500 dark:border-gray-500
        bg-white dark:bg-gray-800">
        <div className="flex flex-wrap gap-x-1 gap-y-2 text-sm">
          <p>Add new alias</p>
          <Button onClick={() => setModalOpen(true)} name="New alias" />
        </div>
      </div>
      <AliasDisplay/>
    </div>
  )
}

