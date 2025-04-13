import { countProduct } from "@/services/products";
import { getAllTags } from "@/services/tags";
import TagItem from "./tag-item";

export const TagFlat = async ({ selectedSlug }: { selectedSlug?: string }) => {
  const [tags, hasTagProductCount] = await Promise.all([
    getAllTags(),
    countProduct({ hasTag: true }),
  ]);

  return (
    <div className="flex flex-wrap justify-center items-end gap-2">
      {/* All */}
      <TagItem
        target="_self"
        title={`All`}
        slug={""}
        count={hasTagProductCount}
        checked={!selectedSlug}
      />
      {/* Tags */}
      {tags?.map((tag: any) => (
        <TagItem
          target="_self"
          key={tag.slug}
          title={`${tag.title}`}
          count={tag.productCount}
          slug={tag.slug}
          checked={selectedSlug === tag.slug}
        />
      ))}
    </div>
  );
};
