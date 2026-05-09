import { useEffect, useRef, useState } from "react";
import Button from "./Button.tsx";
import { useModelStore } from "../../store/useModelStore.ts";

interface ModalProps {
  enable: boolean;
  handleCancel: () => void;
  handleConfirm: (first: string, second: string) => void;
}

export default function Modal( {enable, handleCancel, handleConfirm}: ModalProps) {
  const [emptyWarning, setEmptyWarning] = useState(false);
  const [dupePhraseWarning, setDupePhraseWarning] = useState(false);
  const [first, setFirst] = useState("")
  const [second, setSecond] = useState("")
  const aliases = useModelStore(s => s.aliases);
  const firstRef = useRef<HTMLInputElement>(null);

  function handleWarningReset() {
    setEmptyWarning(false);
    setDupePhraseWarning(false);
  }
  function handleReset() {
    setFirst("")
    setSecond("")
    handleWarningReset()
  }
  function onConfirm() {
    const tFirst = first.trim()
    const tSecond = second.trim()
    if (tFirst == "" || tSecond == "") {
      handleWarningReset();
      setEmptyWarning(true);
    } else if(aliases[tFirst] != undefined) {
      handleWarningReset();
      setDupePhraseWarning(true)
    } else {
      handleConfirm(first, second)
      handleReset();
    }
  }
  function onCancel() {
    handleCancel();
    handleReset();
  }

  useEffect(() => { if (enable) firstRef.current?.focus(); }, [enable]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const inInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (inInput && e.key === "Enter") onConfirm();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onConfirm]);

  return (enable &&
    (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col gap-3 w-80 shadow-lg">
          <p className="font-medium">New Alias</p>
          {emptyWarning && (<p className="text-red-600 text-xs">Please fill in both fields.</p>)}
          {dupePhraseWarning && (<p className="text-red-600 text-xs">Phrase exists.</p>)}
          <input
            ref={firstRef}
            placeholder="Phrase"
            value={first}
            onChange={e => setFirst(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 text-sm dark:bg-gray-700"
          />
          <input
            placeholder="Alias"
            value={second}
            onChange={e => setSecond(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 text-sm dark:bg-gray-700"
          />
          <div className="flex gap-2">
            <Button name="Confirm" onClick={onConfirm} />
            <Button name="Cancel" onClick={onCancel} />
          </div>
        </div>
      </div>
    )
  )
}