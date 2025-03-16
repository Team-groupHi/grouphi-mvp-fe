import { MetadataRoute } from 'next/types';

import { DOMAIN_URL } from '@/constants/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMAIN_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${DOMAIN_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${DOMAIN_URL}/balance-game`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];
}
