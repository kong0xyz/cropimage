import { sanityFetch } from "@/sanity/lib/fetch";
import { tagQuery } from "@/sanity/lib/queries";

export const getAllTags = () => {
  return sanityFetch({ query: tagQuery });
};
