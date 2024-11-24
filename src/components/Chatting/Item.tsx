interface ItemProps {
  name: string;
  message: string;
  index: number;
  isSystem?: boolean;
  isSelf: boolean;
}

const Item = ({
  name,
  message,
  index,
  isSystem = false,
  isSelf,
}: ItemProps) => {
  return (
    <div
      className={`${index === 0 ? 'rounded-t-lg' : ''} p-3 
        ${
          isSystem
            ? 'bg-primary/20'
            : index % 2 === 0
              ? 'bg-container-600'
              : 'bg-white/10'
        } 
        ${isSelf || isSystem ? 'text-primary-400' : ''}`}
    >
      {isSystem ? (
        <span className="font-semibold">{message}</span>
      ) : (
        <div>
          <span className="font-semibold">{name}</span>
          {`: `}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Item;
