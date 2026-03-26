import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 统一使用 www 版本
  const baseUrl = 'https://www.emaildiag.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
