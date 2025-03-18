import { Metadata } from 'next/types';

export const DOMAIN_URL = 'https://grouphi.kr';
export const DEFAULT_DESCRIPTION =
  '그루파이에서 아이스브레이킹 게임을 즐기고 추억을 남겨보세요!';

export const METADATA: Metadata = {
  title: 'groupHi',
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: 'groupHi',
    description: DEFAULT_DESCRIPTION,
    url: DOMAIN_URL,
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'groupHi logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'groupHi',
    description: DEFAULT_DESCRIPTION,
    images: '/images/twitter-image.png',
  },
};
