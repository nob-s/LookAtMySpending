import { useModelStore } from "../store/useModelStore.ts";

export function Aliases() {
  const addAliasToStore = useModelStore((s) => s.addAlias)

  return (
    <div className="flex flex-col">
      <p>aliases</p>
      <button
      onClick={() => {}}>
        {/*TODO*/}
      </button>
    </div>
  )
}

