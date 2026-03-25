import { MetadataRoute } from 'next';
import { getAllProviders } from '@/lib/fix-guides';

const BASE_URL = 'https://EmailDiag.xyz';

export default function sitemap(): MetadataRoute.Sitemap {
  const providers = getAllProviders();
  const recordTypes = ['spf', 'dkim', 'dmarc'];
  
  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/test`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // DNS 提供商页面
  const providerPages: MetadataRoute.Sitemap = providers.map((provider) => ({
    url: `${BASE_URL}/guides/${provider.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 具体指南页面 (provider + record)
  const guidePages: MetadataRoute.Sitemap = [];
  for (const provider of providers) {
    for (const record of recordTypes) {
      guidePages.push({
        url: `${BASE_URL}/guides/${provider.id}/${record}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...providerPages, ...guidePages];
}
