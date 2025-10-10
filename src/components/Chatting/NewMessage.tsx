import { Button } from '@/components';

interface NewMessageProps {
  message: string;
  sender: string;
  onClick: () => void;
}

const NewMessage = ({ message, sender, onClick }: NewMessageProps) => {
  return (
    <Button
      className="justify-start w-full h-7 py-1 px-2 gap-1 rounded "
      onClick={onClick}
      variant={'secondary'}
    >
      {/* <ArrowDownToDot size="0.75rem" /> */}
      <p className="text-body3 overflow-hidden text-ellipsis whitespace-nowrap">
        {`${sender}: ${message}`}
      </p>
    </Button>
  );
};

export default NewMessage;
