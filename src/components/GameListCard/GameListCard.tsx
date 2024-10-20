'use client'
import Image from 'next/image'

interface gameListCardProps {
  title: string
  description?: string
  src?: string
  onClick?: () => void
}

const GameListCard = ({
  title,
  description,
  src,
  onClick,
  ...props
}: gameListCardProps) => {
  return (
    <article
      className={`basis-1/3 max-w-80 min-w-60 relative bg-primary-container shadow rounded-md overflow-hidden`}
      onClick={onClick}
      {...props}
    >
      {src && (
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      )}
      <section
        className={`relative place-content-center margin-auto h-full p-lg bg-gradient-transparent-black rounded-md z-10 hover:bg-black/30 hover:cursor-pointer`}
      >
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
