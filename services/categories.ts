import { sanityFetch } from "@/sanity/lib/fetch";
import { categoryQuery } from "@/sanity/lib/queries";

export const getAllCategories = () => {
  return sanityFetch({ query: categoryQuery });
};
