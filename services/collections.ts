import { sanityFetch } from "@/sanity/lib/fetch";
import {
  collectionProductsQuery,
  collectionQuery,
  collectionSlugQuery,
  moreCollectionQuery,
} from "@/sanity/lib/queries";

export const getAllCollections = () => {
  return sanityFetch({ query: collectionQuery });
};

export const getCollectionBySlug = (params: any) => {
  return sanityFetch({ query: collectionSlugQuery, params });
};

export const getMoreCollections = (params: any) => {
  return sanityFetch({ query: moreCollectionQuery, params });
};

export const getCollectionProducts = (params?: any) => {
  return sanityFetch({ query: collectionProductsQuery, params });
};
