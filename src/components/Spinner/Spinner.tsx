'use client';

import Lottie from 'react-lottie-player';

import groupHi_Spinner_bg from '../../../public/loading/groupHi_Spinner_background.json';
import groupHi_Spinner_item from '../../../public/loading/groupHi_Spinner_item.json';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-[7.5rem] h-[7.5rem] flex items-center justify-center relative">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Lottie
            loop
            animationData={groupHi_Spinner_bg}
            play
            style={{
              width: '300%',
              height: '300%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <div className="absolute inset-0 z-10 overflow-hidden rounded-full flex items-center justify-center">
          <div className="w-[10rem] h-[10rem] flex items-center justify-center overflow-hidden">
            <Lottie
              loop
              animationData={groupHi_Spinner_item}
              play
              style={{ width: '150%', height: '150%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
