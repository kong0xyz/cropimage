import CommonPagination from "@/components/common/common-pagination";
import { isGreaterThanOrEqualToOneInteger } from "@/lib/utils";
import { countProduct, queryProduct } from "@/services/products";
import _ from "lodash";
import { ProductItem } from "./product-item";
import { ProductListEmpty } from "./product-list-empty";

export const ProductList = async ({
  params,
  searchParams,
  extendParams,
  routePath,
}: {
  params: Promise<{ slug?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  extendParams?: any;
  routePath: string;
}) => {
  const {
    category = [],
    tag = [],
    query = "",
    sort = [],
    page = "1",
  } = await searchParams;

  const categories = _.concat([], category);
  const tags = _.concat([], tag);
  const sorts = _.concat([], sort);
  const queryStr = Array.isArray(query) ? _.get(query, "[0]") : _.trim(query);

  const pageObj = _.get(page, "[0]");
  const pageFinal = isGreaterThanOrEqualToOneInteger(pageObj)
    ? Number(pageObj)
    : 1;
  const start = (pageFinal - 1) * 9;
  const end = start + 9;

  const sanityParams = {
    categories: categories,
    tags: tags,
    query: queryStr,
    sorts: sorts,
    start: start,
    end: end,
    ...extendParams,
  };
  const [productList, productCount] = await Promise.all([
    queryProduct(sanityParams),
    countProduct(sanityParams),
  ]);

  return (
    <>
      {productList?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
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
          {/* Pagination */}
          <div className="py-8 flex justify-center">
            <CommonPagination total={productCount} routePath={routePath} />
          </div>
        </>
      ) : (
        <ProductListEmpty />
      )}
    </>
  );
};
