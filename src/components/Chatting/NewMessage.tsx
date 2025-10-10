import { ArrowDownToDot } from 'lucide-react';

interface NewMessageProps {
  message: string;
  onClick: () => void;
}

const NewMessage = ({ message, onClick }: NewMessageProps) => {
  return (
    <section
      className="flex items-center w-full h-7 m-2 mr-5 py-1 px-2 gap-1 rounded bg-secondary-700"
      onClick={onClick}
    >
      <ArrowDownToDot size="0.75rem" />
      <p className="text-body3 overflow-hidden text-ellipsis whitespace-nowrap">
        {message}
      </p>
    </section>
  );
};

export default NewMessage;
