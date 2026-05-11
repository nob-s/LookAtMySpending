import Button from "../modules/general/Button.tsx";
import { useModelStore } from "../store/useModelStore.ts";
import EditableCell from "../modules/grids/EditableCell.tsx";
import { useState } from "react";

function CategoriesDisplay() {
  const [value, setValue] = useState("");
  const categories = useModelStore(s => s.categories);
  const addCategory = useModelStore(s => s.addCategory)
  const removeCategory = useModelStore(s => s.removeCategory)
  const updateCategory = useModelStore(s => s.updateCategory)

  return (
    <div className="flex flex-col gap-y-4">
      {
        categories.map((_, idx) =>
          <div className="flex gap-x-4 border border-gray-300 dark:border-gray-600">
            <EditableCell
              initial={categories[idx]}
              onCommit={(v) => updateCategory(v, idx)}/>
            <Button name={"Delete Group"} onClick={() => removeCategory(idx)}/>
          </div>)
      }
      <input
        placeholder="Group Name"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded p-2 text-sm dark:bg-gray-700"
      />
      <Button name={"Add new Group"} onClick={() => {addCategory(value); setValue("");}}/>
    </div>
  );
}

export default function Categories() {

  return (
    <div className="flex flex-1">
      {/* left bar */}
      <div className="
        flex flex-col max-h-full overflow-y-auto min-h-0
        px-4 py-3 gap-y-3 w-64
        border-r border-gray-500 dark:border-gray-500
        bg-white dark:bg-gray-800">
        <div className="flex flex-wrap gap-x-1 gap-y-2 text-sm">
          <p>Add new Groups</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Label your transactions using groups added here!
          </p>
        </div>
      </div>
      <CategoriesDisplay/>
    </div>
  )
}

