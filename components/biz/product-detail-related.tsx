import { ProductItem } from "./product-item";
import { ProductListEmpty } from "./product-list-empty";
import { queryProduct } from "@/services/products";

export const ProductDetailRelated = async ({
  skipSlug,
  limit = 2,
  categories = [],
  tags = [],
}: {
  skipSlug: string;
  limit: number;
  categories: string[];
  tags: string[];
}) => {
  const sanityParams = {
      categories: categories,
      tags: tags,
      start: 0,
      end: limit,
      skipSlug: skipSlug,
    },
    defaultSanityParams = {
      start: 0,
      end: limit,
      skipSlug: skipSlug,
    };

  const [relatedProductList] = await Promise.all([queryProduct(sanityParams)]);

  const productList =
    relatedProductList?.length < 2
      ? await queryProduct(defaultSanityParams)
      : relatedProductList;

  return (
    <div>
      {productList?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {productList?.map((product: any) => {
            return (
              <ProductItem
                slug={product.slug}
                time={product?._createdAt}
                coverImage={product?.coverImage}
                avatarImage={product?.avatarImage}
                key={product?._id}
                title={product?.title}
                excerpt={product?.excerpt}
                categories={product?.categories}
                tags={product?.tags}
              />
            );
          })}
        </div>
      ) : (
        <ProductListEmpty />
      )}
    </div>
  );
};
