interface gameCardProps {
  title: string
  description?: string
  width?: string | number
  height?: string | number
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
      className={`p-md bg-primary-container shadow rounded-md`}
      {...props}
    >
      <section className="relative z-10">
        <p className="text font-medium truncate">{title}</p>
        {description && (
          <p
            className={`text-sm text-gray pt-2 overflow-hiddden text-ellipsis line-clamp-2 break-all`}
          >
            {description}
          </p>
        )}
      </section>
    </article>
  )
}

export default GameListCard
