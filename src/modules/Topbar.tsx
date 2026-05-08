interface TopbarButtonProps {
  name: string,
  onClick: () => void,
}

export const TopbarButton = ({name, onClick}: TopbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
      min-w-24 px-4 py-2 rounded-lg font-medium text-sm
      border border-gray-500 dark:border-gray-500
      bg-gray-50 dark:bg-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-600
      active:bg-gray-200 dark:active:bg-gray-800
      transition-colors duration-150">
      {name}
    </button>
  )
}

interface TopbarProps {
  setWindowAliases: () => void,
  setWindowManage: () => void,
  setWindowImportData: () => void,
}

export const Topbar = ( {setWindowAliases, setWindowManage, setWindowImportData} : TopbarProps) => {

  function toggleDark() {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <div className="=
      flex items-center w-full px-6 py-3
      border-b border-gray-500 dark:border-gray-500
      bg-white dark:bg-gray-800
      shadow-sm">
      <div className="flex flex-1 gap-2 justify-center">
        <TopbarButton name={"Aliases"} onClick={setWindowAliases} />
        <TopbarButton name={"Main"} onClick={setWindowManage}/>
        <TopbarButton name={"Import"} onClick={setWindowImportData}/>
      </div>
      <div className="ml-auto">
        <TopbarButton name={"🌙"} onClick={toggleDark} />
      </div>
    </div>
  )
}