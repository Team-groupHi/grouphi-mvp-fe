import { MetadataRoute } from 'next';

const DOMAIN_URL = process.env.DOMAIN_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
    },
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}
