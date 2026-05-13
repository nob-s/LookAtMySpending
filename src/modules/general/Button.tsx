interface ButtonProps {
  name: React.ReactNode,
  onClick: () => void,
  className?: string,
}

export default function Button({name, onClick, className}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        border-2 rounded-xl p-2 w-full
        border-gray-500 dark:border-gray-500
        hover:bg-gray-200 dark:hover:bg-gray-700
        active:bg-gray-400 dark:active:bg-gray-900
        transition-all duration-150 ${className}`}>
      {name}
    </button>
  )
}