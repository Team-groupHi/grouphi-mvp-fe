interface ItemProps {
  name: string;
  message: string;
  index: number;
  type: 'system' | 'me' | 'others';
}

const Item = ({ name, message, index, type }: ItemProps) => {
  return (
    <div
      className={`${index === 0 ? 'rounded-t-lg' : ''} p-3 
        ${
          type == 'system'
            ? 'bg-primary/20'
            : index % 2 === 0
              ? 'bg-container-600'
              : 'bg-white/10'
        } 
        ${type !== 'others' ? 'text-primary-400' : ''}`}
    >
      {type == 'system' ? (
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
