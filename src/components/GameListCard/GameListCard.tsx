interface gameCardProps {
  title: string
  description?: string
  flexBasis?: string | number
  maxWidth?: string
}

const GameListCard = ({
  title,
  description,
  flexBasis = '1/3',
  maxWidth = 'xs',
  ...props
}: gameCardProps) => {
  return (
    <article
      className={`basis-${flexBasis} max-w-${maxWidth} p-md bg-primary-container p-sm shadow rounded-md`}
      {...props}
    >
      <p className="text font-medium">{title}</p>
      {description && <p className="text-sm text-gray pt-2">{description}</p>}
    </article>
  )
}

export default GameListCard
