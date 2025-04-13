import { defineQuery, groq } from "next-sanity";

const pageSize = process.env.SITE_PAGE_SIZE || 9;

// Setting
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

// Post
const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

// category

const categoryFields = `
  _id,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  description,
  "productCount": count(*[_type == "product" && references(^._id)])
`;

export const categoryQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    ${categoryFields}
  }
`);

export const categorySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug] [0] {
    ${categoryFields}
  }
`);

// tag

const tagFields = `
  _id,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  description,
  "productCount": count(*[_type == "product" && references(^._id)])
`;

export const tagQuery = defineQuery(`
  *[_type == "tag" && defined(slug.current)] | order(title asc) {
    ${tagFields}
  }
`);

export const tagSlugQuery = defineQuery(`
  *[_type == "tag" && slug.current == $slug] [0] {
    ${tagFields}
  }
`);

// collection

const collectionFields = `
  _id,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  description,
  "productCount": count(*[_type == "product" && references(^._id)])
`;

export const collectionQuery = defineQuery(`
  *[_type == "collection" && enabled == true && defined(slug.current)] | order(sortable asc) {
    ${collectionFields}
  }
`);

export const collectionSlugQuery = defineQuery(`
  *[_type == "collection" && enabled == true && slug.current == $slug] [0] {
    ${collectionFields}
  }
`);

export const moreCollectionQuery = defineQuery(`
  *[_type == "collection" && enabled == true && _id != $skip && defined(slug.current)] | order(sortable asc) [0...$limit] {
    ${collectionFields}
  }
`);

// product

const productFields = `
  _id,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  targetLink,
  excerpt,
  coverImage,
  avatarImage,
  "date": coalesce(date, _updatedAt),
  "tags": tags[]-> {_id, title, "slug": slug.current},
  "categories": categories[]->{_id, title, "slug": slug.current},
  keywords,
  licenses,
  score
`;

// products
export const productQuery = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(title asc) {
    "slug": slug.current
  }
`);

export const productQueryForSitemap = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(title asc) {
    ${productFields}
  }
`);

// product by slug
export const productSlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug] [0] {
    content,
    ${productFields}
  }
`);

const processSortSegment = (sorts: string[]) => {
  if (sorts) {
    const items: string[] = sorts
      .filter((sort) => {
        return ["title", "-title"].includes(sort);
      })
      .map((sort: string) => {
        return sort.startsWith("-")
          ? `${sort.substring(1)} desc`
          : `${sort} asc`;
      });

    if (items?.length > 0) {
      return ` | order(${items.join(",")})`;
    }
  }
  return null;
};
// pagination
export const porductCursorFilter = (params: any) => {
  const start = params?.start ?? 0;
  const end = params?.end ?? start + pageSize;
  return `[${start}...${end}]`;
};

export const productQueryFilter = (params: any) => {
  const filterItems = ['_type == "product" && defined(slug.current)'];

  if (params?.skip) {
    filterItems.push("_id != $skip");
  }

  if (params?.skipSlug) {
    filterItems.push("slug.current != $skipSlug");
  }

  if (params?.categorySlug) {
    filterItems.push("$categorySlug in categories[] -> slug.current");
  }

  if (params?.hasCategory === true) {
    filterItems.push("defined(categories)");
  }

  if (params?.tagSlug) {
    filterItems.push("$tagSlug in tags[] -> slug.current");
  }

  if (params?.hasTag === true) {
    filterItems.push("defined(tags)");
  }

  if (params?.collectionSlug) {
    filterItems.push("$collectionSlug in collections[] -> slug.current");
  }

  if (params?.categories?.length > 0) {
    filterItems.push(
      "count((categories[]->slug.current)[@ in $categories]) > 0"
    );
  }

  if (params?.tags?.length > 0) {
    filterItems.push("count((tags[]->slug.current)[@ in $tags]) > 0");
  }

  if (params?.query) {
    filterItems.push(
      `[title,description,pt::text(content)] match ["*${params?.query}*"]`
    );
  }

  return filterItems.join(" && ");
};
// product search
export const productSearchQuery = (params: any, filterStr?: string) => {
  const filter = filterStr ?? productQueryFilter(params);
  const sorts = processSortSegment(params?.sorts);
  const cursor = porductCursorFilter(params);

  // query
  const query = defineQuery(
    `*[${filter}] ${sorts ?? " | order(title asc) "} { ${productFields} } ${cursor}`
  );

  return query;
};
// product records count
export const productCountQuery = (params: any, filterStr?: string) => {
  const filter = filterStr ?? productQueryFilter(params);

  // query
  const query = defineQuery(`count(*[${filter}] { _id })`);

  return query;
};

/**
 * join query
 */
export const collectionProductsQuery = defineQuery(`
  *[_type == "collection" && enabled == true && defined(slug.current)] | order(sortable asc) {
    "products": *[_type == "product" && references(^._id)][0...6] {${productFields}},
    ${collectionFields} 
  }
`);
