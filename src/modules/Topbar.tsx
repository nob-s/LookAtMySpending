interface TopbarProps {
  name: string,
}

export const TopbarButton = ({name}: TopbarProps) => {
  return (
    <button className="
    border-l-3 border-r-3 rounded-xl p-4 border-gray-600 h-full
    hover:bg-gray-200
    active:bg-gray-300
    transition-all duration-150">
      {name}
    </button>
  )
}
export const Topbar = () => {
    return (
      <div className="
      border-b-4 rounded-2xl border-gray-300 gap-2
      flex items-center justify-center w-screen">
        <TopbarButton name={"Home"}/>
        <TopbarButton name={"Aliases"}/>
      </div>
    )
}