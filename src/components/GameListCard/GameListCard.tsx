interface gameCardProps {
  title: string
  description?: string
  width?: string | number
  height?: string | number
  flexBasis?: string | number
  maxWidth?: string
}

const GameListCard = ({
  title,
  description,
  width = '20rem',
  height = '12rem',
  ...props
}: gameCardProps) => {
  return (
    <article
      style={{ width, height }}
      className={`p-md bg-primary-container p-sm shadow rounded-md`}
      {...props}
    >
      <p className="text font-medium">{title}</p>
      {description && <p className="text-sm text-gray pt-2">{description}</p>}
    </article>
  )
}

export default GameListCard
