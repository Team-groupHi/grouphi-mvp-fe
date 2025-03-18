import { MetadataRoute } from 'next';

import { DOMAIN_URL } from '@/constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
    },
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}
