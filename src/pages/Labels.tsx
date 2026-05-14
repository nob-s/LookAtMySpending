import { useModelStore } from "../store/useModelStore.ts";
import MyButton from "../modules/general/MyButton.tsx";
import AliasDisplay from "../modules/grids/AliasDisplay.tsx";
import AliasModal from "../modules/general/AliasModal.tsx";
import { useUiStore } from "../store/useUiStore.ts";
import CategoriesDisplay from "../modules/grids/CategoriesDisplay.tsx";

export function Labels() {
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
      <AliasModal enable={modalOpen} handleCancel={() => setModalOpen(false)} handleConfirm={handleConfirm}/>
      {/* left bar */}
      <div className="
        flex flex-col max-h-full overflow-y-auto min-h-0
        px-4 py-3 gap-y-20 w-64
        border-r border-gray-500 dark:border-gray-500
        bg-white dark:bg-gray-800">
        <div className="flex flex-wrap gap-x-1 gap-y-2 text-sm">
          <p>Add new alias</p>
          <MyButton onClick={() => setModalOpen(true)} name={<>New alias <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">Q</kbd></>} />
          <MyButton onClick={toggleAliasView} name={<>Toggle alias <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">T</kbd></>} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Press{" "}
            <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">Q</kbd>
            {" "}to add aliases, or{" "}
            <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">T</kbd>
            {" "}to toggle aliases anywhere!
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Giving an Alias to a Phrase replaces all Descriptions that contain the Phrase with the Alias!
          </p>
        </div>
        <div className="flex flex-wrap gap-x-1 gap-y-2 text-sm border-t
        py-2 border-gray-300 dark:border-gray-600">
          <p>Add new Categories</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Label your transactions using categories added here!
          </p>
        </div>
      </div>
      <div className="flex w-full px-5 gap-x-10">
        <AliasDisplay/>
        <CategoriesDisplay/>
      </div>
    </div>
  )
}

