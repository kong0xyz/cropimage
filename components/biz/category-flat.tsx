import { getAllCategories } from "@/services/categories";
import { countProduct } from "@/services/products";
import CategoryItem from "./category-item";

export const CategoryFlat = async ({
  selectedSlug,
}: {
  selectedSlug?: string;
}) => {
  const [categories, hasCategoryProductCount] = await Promise.all([
    getAllCategories(),
    countProduct({ hasCategory: true }),
  ]);

  return (
    <div className="flex flex-wrap justify-center items-end gap-2">
      {/* All */}
      <CategoryItem
        target="_self"
        title={`All`}
        slug=""
        count={hasCategoryProductCount}
        checked={!selectedSlug}
      />

      {/* Categories */}
      {categories?.map((category: any) => (
        <CategoryItem
          key={category.slug}
          checked={selectedSlug === category.slug}
          target="_self"
          title={category.title}
          count={category.productCount}
          slug={category.slug}
        />
      ))}
    </div>
  );
};
