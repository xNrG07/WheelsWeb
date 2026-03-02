import { MetadataRoute } from 'next';
import { winterRegulations } from '@/data/winterRegulations';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date().toISOString();

  const staticPages = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${base}/tools/reifenrechner`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/tools/felgen-et-check`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/tools/dot-decoder`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/winterpflicht`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.85 },
    { url: `${base}/guide/reifen-basiswissen`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.7 },
  ];

  const countryPages = winterRegulations.map((r) => ({
    url: `${base}/winterpflicht/${r.slug}`,
    lastModified: r.last_updated,
    changeFrequency: 'yearly' as const,
    priority: 0.65,
  }));

  return [...staticPages, ...countryPages];
}
