import { useModelStore } from "../store/useModelStore.ts";
import Button from "../modules/general/Button.tsx";
import AliasDisplay from "../modules/grids/AliasDisplay.tsx";
import Modal from "../modules/general/Modal.tsx";
import { useUiStore } from "../store/useUiStore.ts";

export function Aliases() {
  const addAliasToStore = useModelStore((s) => s.addAlias)
  const modalOpen = useUiStore(s => s.modalOpen)
  const setModalOpen = useUiStore(s => s.setModalOpen)
  const toggleAliasView = useModelStore((s) => s.toggleAliasView)
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
          <Button onClick={() => setModalOpen(true)} name={<>New alias <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">Q</kbd></>} />
          <Button onClick={toggleAliasView} name={<>Toggle alias <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">T</kbd></>} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Press{" "}
            <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">Q</kbd>
            {" "}to add aliases, or{" "}
            <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">T</kbd>
            {" "}to toggle aliases anywhere!
          </p>
        </div>
      </div>
      <AliasDisplay/>
    </div>
  )
}

