import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
export default function sitemap(): MetadataRoute.Sitemap {
 const paths = ["/", "/life", "/health", "/medicare", "/retirement", "/team", "/agent/justin-stark", "/agent/brandon-gonzales", "/agent/jake-wingo", "/about", "/contact", "/locations", "/locations/tupelo", "/locations/oxford", "/locations/new-albany", "/locations/pontotoc", "/locations/southaven", "/locations/amory", "/locations/corinth", "/locations/columbus", "/locations/ocean-springs", "/resources", "/privacy", "/terms"]
 return [...paths.map(path => ({url: `https://pontotocinsuranceagency.com${path}`})), ...articles.filter(a => a.reviewStatus !== 'pending').map(a => ({url: `https://pontotocinsuranceagency.com/resources/${a.slug}`, lastModified: a.reviewedAt || a.datePublished}))]
}
