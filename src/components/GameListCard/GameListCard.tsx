import Image from 'next/image'

interface gameCardProps {
  title: string
  description?: string
  src?: string
}

const GameListCard = ({ title, description, src, ...props }: gameCardProps) => {
  return (
    <article
      className={`basis-1/3 max-w-80 min-w-60 relative bg-primary-container shadow rounded-md overflow-hidden`}
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
        className={`relative place-content-center margin-auto h-full p-lg bg-black bg-opacity rounded-md z-10`}
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
