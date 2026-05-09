import { useEffect, useState } from "react";

interface AliasRowProps {
  phrase: string;
  alias: string;
  updateMethod?: (newPhrase: string, oldPhrase: string, alias: string) => void;
}

export default function AliasRow({phrase, alias, updateMethod}: AliasRowProps) {
  const isEditable = updateMethod != undefined;
  const [rawPhrase, setRawPhrase] = useState<string>("");
  const [rawAlias, setRawAlias] = useState<string>("");
  useEffect(() => { setRawPhrase(phrase); }, [phrase]);
  useEffect(() => { setRawAlias(alias); }, [alias]);

  return (isEditable
      ? <div className="
        w-full grid grid-cols-[60%_40%]
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
        <input
          value={rawPhrase}
          onChange={e => setRawPhrase(e.target.value)}
          onBlur={() =>
            updateMethod(phrase, rawPhrase, rawAlias)
          }
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm"/>
        <input
          value={rawAlias}
          onChange={e => setRawAlias(e.target.value)}
          onBlur={() =>
            updateMethod(phrase, rawPhrase, rawAlias)
          }
          className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm"/>
      </div>

      : <div className="
        grid grid-cols-[60%_40%]
        border-b border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700">
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{phrase}</p>
        <p className="border-r border-gray-300 dark:border-gray-600 p-1 text-sm">{alias}</p>
      </div>
  );
}