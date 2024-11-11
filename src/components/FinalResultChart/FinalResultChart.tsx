import Bar from './Bar';

const FinalResultChart = () => {
  return (
    <div className="bg-container-600">
      <Bar
        candidate1="강아지"
        votes1={2}
        candidate2="고양이"
        votes2={7}
        nonParticipants={1}
      ></Bar>
      <Bar
        candidate1="강하띠"
        votes1={4}
        candidate2="코앵이"
        votes2={6}
        nonParticipants={0}
      ></Bar>
    </div>
  );
};

export default FinalResultChart;
