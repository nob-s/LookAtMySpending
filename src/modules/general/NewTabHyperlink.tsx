interface NewTabHyperlinkProps {
  link: string
}

export const NewTabHyperlink = ({link}: NewTabHyperlinkProps) => {
  return (
    <a href={link}
       target="_blank"
       rel="noopener noreferrer"
       className="underline
        text-blue-600 dark:text-blue-400
        hover:text-blue-800 dark:hover:text-blue-300">
      here
    </a>
  )
}