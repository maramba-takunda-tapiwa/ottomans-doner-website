import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com'; // TODO: replace with production domain
  const routes = ['', '/menu', '/about', '/contact', '/admin'].map(p => ({ url: base + p, lastModified: new Date() }));
  return routes;
}