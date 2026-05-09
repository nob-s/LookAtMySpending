import { useEffect } from "react";
import Modal from "./general/Modal.tsx";
import { useModelStore } from "../store/useModelStore.ts";
import { useUiStore } from "../store/useUiStore.ts";

interface TopbarButtonProps {
  name: React.ReactNode,
  onClick: () => void,
}

export const TopbarButton = ({name, onClick}: TopbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
      min-w-24 px-4 py-2 rounded-lg font-medium text-sm
      border border-gray-500 dark:border-gray-500
      bg-gray-50 dark:bg-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-600
      active:bg-gray-200 dark:active:bg-gray-800
      transition-colors duration-150">
      {name}
    </button>
  )
}

interface TopbarProps {
  setWindowAliases: () => void,
  setWindowManage: () => void,
  setWindowImportData: () => void,
}

export const Topbar = ( {setWindowAliases, setWindowManage, setWindowImportData} : TopbarProps) => {
  const toggleDarkMode = useUiStore(s => s.toggleDarkMode)
  const addAliasToStore = useModelStore((s) => s.addAlias)
  const modalOpen = useUiStore(s => s.modalOpen)
  const setModalOpen = useUiStore(s => s.setModalOpen)
  const toggleModal = useUiStore(s => s.toggleModal)
  const toggleAliasView = useModelStore((s) => s.toggleAliasView)
  function handleConfirm(phrase: string, alias: string): void {
    if (phrase && alias) {
      addAliasToStore(phrase, alias)
      setModalOpen(false)
    }
  }
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const inInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (inInput || (modalOpen && e.key !== "4")) return;
      if (e.key === "1") setWindowAliases();
      if (e.key === "2") setWindowManage();
      if (e.key === "3") setWindowImportData();
      if (e.key === "4") {
        e.preventDefault()
        toggleModal()
      }
      if (e.key === "5") toggleAliasView();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setWindowAliases, setWindowManage, setWindowImportData,
    modalOpen, toggleModal, toggleAliasView]);

  return (
    <div className="=
      flex w-full px-6 py-3
      border-b border-gray-500 dark:border-gray-500
      bg-white dark:bg-gray-800
      shadow-sm">
      {/* Popup */}
      <Modal enable={modalOpen} handleCancel={() => setModalOpen(false)} handleConfirm={handleConfirm}/>
      {/*Actual Topbar*/}
      <div className="flex flex-1 gap-2 justify-center">
        <TopbarButton name={<>Aliases <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">1</kbd></>} onClick={setWindowAliases} />
        <TopbarButton name={<>Main <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">2</kbd></>} onClick={setWindowManage}/>
        <TopbarButton name={<>Import <kbd className="px-1 rounded border border-gray-300 dark:border-gray-600 text-xs">3</kbd></>} onClick={setWindowImportData}/>
      </div>
      <div className="ml-auto">
        <TopbarButton name={"🌙"} onClick={toggleDarkMode} />
      </div>
    </div>
  )
}