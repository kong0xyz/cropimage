import { sanityFetch } from "@/sanity/lib/fetch";
import {
  categoryQuery,
  collectionQuery,
  productQueryForSitemap,
  tagQuery,
} from "@/sanity/lib/queries";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const [products, categories, tags, collections] = await Promise.all([
    sanityFetch({ query: productQueryForSitemap }),
    sanityFetch({ query: categoryQuery }),
    sanityFetch({ query: tagQuery }),
    sanityFetch({ query: collectionQuery }),
  ]);

  const siteUrl = process.env.SITE_URL;

  const productMaps = products?.map((product: any) => {
    return {
      loc: `${siteUrl}/item/${product.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    } as ISitemapField;
  });

  const categoryMaps = categories?.map((category: any) => {
    return {
      loc: `${siteUrl}/category/${category.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    } as ISitemapField;
  });

  const tagMaps = tags?.map((tag: any) => {
    return {
      loc: `${siteUrl}/tag/${tag.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    } as ISitemapField;
  });

  const collectionMaps = collections?.map((collection: any) => {
    return {
      loc: `${siteUrl}/collection/${collection.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    } as ISitemapField;
  });
  return getServerSideSitemap([
    ...productMaps,
    ...categoryMaps,
    ...tagMaps,
    ...collectionMaps,
  ]);
}
