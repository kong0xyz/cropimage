import ProductDetail from "@/components/biz/product-detail";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productSlugQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const [product] = await Promise.all([
    sanityFetch({ query: productSlugQuery, params }),
  ]);

  if (!product) {
    return;
  }

  return constructMetadata({
    title: `Product / ${product.title} - ${siteConfig.title}`,
    description: `${product.excerpt}`,
  });
}

export default async function ProductDetailPage({ params }: Readonly<Props>) {
  // const props = await params;

  const [product] = await Promise.all([
    sanityFetch({ query: productSlugQuery, params }),
  ]);

  return (
    <div className="container">
      <ProductDetail product={product}></ProductDetail>
    </div>
  );
}
