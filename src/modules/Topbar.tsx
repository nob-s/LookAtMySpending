interface TopbarButtonProps {
  name: string,
  onClick: () => void,
}

export const TopbarButton = ({name, onClick }: TopbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
      border-l-3 border-r-3 rounded-xl p-4 h-full
      border-gray-600 dark:border-gray-200
      hover:bg-gray-200 hover:dark:bg-gray-700
      active:bg-gray-400 active:dark:bg-gray-900
      transition-all duration-150">
      {name}
    </button>
  )
}

interface TopbarProps {
  setWindowManage: () => void,
  setWindowAliases: () => void,
}

export const Topbar = ( {setWindowManage, setWindowAliases} : TopbarProps) => {

  function toggleDark() {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <div className="=
      flex items-center justify-center w-screen pr-4 pl-4
      border-b-4 rounded-bl-2xl rounded-br-2xl
      border-gray-600 dark:border-white gap-2
      bg-white dark:bg-gray-600">
      <div className="flex flex-1 justify-center gap-2">
        <TopbarButton name={"✏️"} onClick={setWindowAliases} />
        <TopbarButton name={"🏠"} onClick={setWindowManage}/>
      </div>
      <div className="ml-auto">
        <TopbarButton name={"🌙"} onClick={toggleDark} />
      </div>
    </div>
  )
}