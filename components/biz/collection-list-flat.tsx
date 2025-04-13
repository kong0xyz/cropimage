import { getAllCollections, getMoreCollections } from "@/services/collections";
import CollectionItem from "./collection-item";

export const CollectionListFlat = async ({
  skip,
  limit,
}: {
  skip?: string;
  limit?: number;
}) => {
  const [collections] = await Promise.all([
    skip ? getMoreCollections({ skip, limit }) : getAllCollections(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 px-4 py-8">
      {collections.map((collection: any) => {
        return (
          <CollectionItem
            key={collection.slug}
            description={collection.description}
            target="_self"
            title={collection.title}
            count={collection.productCount}
            slug={collection.slug}
          />
        );
      })}
    </div>
  );
};
