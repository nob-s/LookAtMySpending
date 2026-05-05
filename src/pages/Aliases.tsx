import { useStore } from "../store/useStore.ts";

export function Aliases() {
  const addAliasToStore = useStore((s) => s.addAlias)

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

