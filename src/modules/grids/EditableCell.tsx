import { useEffect, useState } from "react";

export default function EditableCell({ initial, onCommit, className}: {
  initial: string;
  onCommit: (value: string) => void;
  className?: string;
}) {
  const [raw, setRaw] = useState(initial);
  useEffect(() => { setRaw(initial); }, [initial]);

  return (
    <input
      value={raw}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={(e) => onCommit(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onCommit(e.currentTarget.value);
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          setRaw(initial);
        }
      }}
      className={`
      border-r border-gray-300 dark:border-gray-600 p-1 text-sm ${className ?? ""}`}
    />
  );
}