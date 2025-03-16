import { MetadataRoute } from 'next/types';

import { DOMAIN_URL } from '@/constants/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMAIN_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${DOMAIN_URL}/balance-game`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
