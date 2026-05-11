import { type ChangeEvent, useState } from "react";
import { Calc } from "../util/Calc.ts";
import { FileParser } from "../util/FileParser.ts";
import * as React from "react";

interface JsonUploaderProps {
  onJsonLoaded: (jsonString: string) => void;
}

export const JsonUploader: React.FC<JsonUploaderProps> = ({onJsonLoaded}) => {
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length <= 0) { return; }

    const file = e.target.files[0];

    if (!file.name.endsWith(".json")) {
      alert("File does not have a .json extension!");
      return;
    }

    setFile(file);

    try {
      const jsonString: string = await FileParser.parseJsonToJsonString(file);
      onJsonLoaded(jsonString);
    } catch (err) {
      alert("Failed to parse JSON: " + err);
    }
  }

  return (
    <div>
      <input
        onChange={handleFileChange}
        type="file"
        accept=".json"
        className="
        w-full overflow-hidden
        border-r border-gray-500 dark:border-gray-500
        bg-white dark:bg-gray-800
        block text-sm file:mr-4 file:py-1 file:px-1
        file:rounded file:border-2 file:border-gray-600
        file:text-sm file:font-semibold
        file:bg-gray-200 file:text-gray-700
        hover:file:bg-gray-400" />
      {file && (
        <div className="pl-1">
          <p>Size: {Calc.bytesToFileSize(file.size)}</p>
        </div>
      )}
    </div>
  )
}