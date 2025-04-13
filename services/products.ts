import { sanityFetch } from "@/sanity/lib/fetch";
import {
  productQuery,
  productCountQuery,
  productSearchQuery,
  productSlugQuery,
} from "@/sanity/lib/queries";

export const getAllProducts = () => {
  return sanityFetch({ query: productQuery });
};

export const getProductBySlug = (params: any) => {
  return sanityFetch({ query: productSlugQuery, params });
};

export const countProduct = (params: any) => {
  const countQuery = productCountQuery(params);
  // console.debug("sanity product count query:", countQuery, params);
  return sanityFetch({ query: countQuery, params });
};

export const queryProduct = (params: any) => {
  const dataQuery = productSearchQuery(params);
  // console.debug("sanity product data query:", dataQuery, params);
  return sanityFetch({ query: dataQuery, params });
};
