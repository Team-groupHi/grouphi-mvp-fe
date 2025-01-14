import BalanceGameQuestionCard from '../BalanceGameQuestionCard';
import Timer from '../Timer';

const BalanceGameProgress = () => {
  // 부모 페이지에서 받는 방식?
  return (
    <>
      <Timer
        startTime={0}
        endTime={10}
      />
      <BalanceGameQuestionCard
        label={'1'}
        selectedAnimal={null}
        onSelect={() => console.log(1)}
      />

      <BalanceGameQuestionCard
        label={'2'}
        selectedAnimal={null}
        onSelect={() => console.log(2)}
      />
    </>
  );
};

export default BalanceGameProgress;
