interface gameCardProps {
  title: string
  description?: string
}

const GameListCard = ({ title, description }: gameCardProps) => {
  return (
    <article>
      <p>{title}</p>
      <p>{description}</p>
    </article>
  )
}

export default GameListCard
