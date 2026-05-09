import { useModelStore } from "../store/useModelStore.ts";
import Button from "../modules/general/Button.tsx";
import AliasDisplay from "../modules/grids/AliasDisplay.tsx";
import Modal from "../modules/general/Modal.tsx";
import { useUiStore } from "../store/useUiStore.ts";

export function Aliases() {
  const addAliasToStore = useModelStore((s) => s.addAlias)
  const modalOpen = useUiStore(s => s.modalOpen)
  const setModalOpen = useUiStore(s => s.setModalOpen)
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
          <Button onClick={() => setModalOpen(true)} name="New alias [4]" />
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Note: You can also press [4] while on the MAIN page to add aliases
          </p>
        </div>
      </div>
      <AliasDisplay/>
    </div>
  )
}

