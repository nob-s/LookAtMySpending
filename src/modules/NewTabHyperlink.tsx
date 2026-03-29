interface NewTabHyperlinkProps {
  link: string
}

export const NewTabHyperlink = ({link}: NewTabHyperlinkProps) => {
  return (
    <a href={link}
       target="_blank"
       rel="noopener noreferrer"
       className="text-blue-700 underline">
      here
    </a>
  )
}