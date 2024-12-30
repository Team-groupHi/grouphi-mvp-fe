import Lottie from 'react-lottie-player';
import groupHi_Spinner from '../../../public/groupHi_Spinner.json';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-[17rem] h-[17rem] bg-black bg-opacity-75 rounded-full border-4 border-t-container-300 border-opacity-50 animate-spin-slow absolute"></div>
      <div className="w-[15rem] h-[15rem] flex items-center justify-center relative">
        <Lottie
          loop
          animationData={groupHi_Spinner}
          play
        />
      </div>
    </div>
  );
};

export default Spinner;
