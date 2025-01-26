interface BalanceGameQuestionCardProps {
  label: string;
  selectedAnimal: string | null;
  onSelect: () => void;
}

const BalanceGameQuestionCard = ({
  label,
  selectedAnimal,
  onSelect,
  ...props
}: BalanceGameQuestionCardProps) => {
  const isSelected = selectedAnimal === label;

  return (
    <section
      className={`max-h-60 max-w-60 min-h-40 min-w-40 flex items-center justify-center border-2 rounded-lg cursor-pointer bg-container ${
        isSelected
          ? 'border-secondary-500'
          : 'border-transparent hover:border-gray-300'
      }`}
      onClick={onSelect}
      {...props}
    >
      <span className="text-light font-bold text-lg">{label}</span>
    </section>
  );
};

export default BalanceGameQuestionCard;
