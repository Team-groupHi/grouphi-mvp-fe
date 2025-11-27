import React from 'react';

import { cn } from '@/lib/utils';

type AdType = 'leaderboard' | 'wideLeaderboard';

interface AdBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  type: AdType;
  ariaLabel?: string;
}

// TODO: 광고 붙이기
const AdBanner = ({
  type,
  ariaLabel = '광고 영역',
  children,
  ...props
}: AdBannerProps) => {
  const adStyle = {
    leaderboard: 'w-ads-leaderboard h-ads-leaderboard',
    wideLeaderboard: 'w-ads-leaderboard-wide h-ads-leaderboard',
  };
  return (
    <div
      {...props}
      className={cn(
        'ad-slot text-center bg-black rounded shrink-0',
        adStyle[type],
        props.className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default AdBanner;
