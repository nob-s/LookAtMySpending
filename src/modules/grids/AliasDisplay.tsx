import AliasRow from "./AliasRow.tsx";
import { useModelStore } from "../../store/useModelStore.ts";

export default function AliasDisplay() {
  const aliases = useModelStore(s => s.aliases);
  const updateAlias = useModelStore(s => s.updateAlias);
  return (
    <div className="flex flex-col flex-1 p-2 overflow-y-auto">
      {/* Headers */}
      <AliasRow phrase={"Phrase"} alias={"Alias"}/>
      {/* All transactions */}
      {Object.entries(aliases).map(([phrase, alias]) => (
        <AliasRow phrase={phrase} alias={alias} updateMethod={updateAlias}/>
      ))}
    </div>
  );
}