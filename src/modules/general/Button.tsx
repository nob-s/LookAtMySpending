interface ButtonProps {
  name: string,
  onClick: () => void,
}

export default function Button({name, onClick}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        border-2 rounded-xl p-2 w-full
        border-gray-500 dark:border-gray-500
        hover:bg-gray-200 dark:hover:bg-gray-700
        active:bg-gray-400 dark:active:bg-gray-900
        transition-all duration-150">
      {name}
    </button>
  )
}