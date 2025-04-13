import BasicAnnouncement from "@/components/landing/basic-announcement";
import BasicHero from "@/components/landing/basic-hero";
import { getCollectionProducts } from "@/services/collections";
import { PageSection } from "../page-section";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { AnimatedGridPattern } from "../common/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { ProductItem } from "../biz/product-item";

export default async function LandingPage() {
  const collectionProducts = await getCollectionProducts();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col justify-center gap-16">
        {/* Announcement */}
        <BasicAnnouncement />
        {/* Hero  */}
        <BasicHero />
      </div>
      {/* Products */}
      <div className="pt-10">
        {collectionProducts?.map((coll: any) => {
          return (
            <PageSection
              key={coll.slug}
              title={coll.title}
              description={coll.description}
              moreAction={
                <Button
                  className="dark:text-foreground"
                  aria-label={`${coll.title}`}
                  href={`/collection/${coll.slug}`}
                  as={Link}
                  variant="light"
                  color="primary"
                  endContent={<IconArrowRight />}
                >
                  More
                </Button>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {coll?.products?.map((product: any) => {
                  return (
                    <ProductItem
                      key={product?._id}
                      slug={product.slug}
                      time={product?._createdAt}
                      coverImage={product?.coverImage}
                      avatarImage={product?.avatarImage}
                      title={product?.title}
                      excerpt={product?.excerpt}
                      categories={product?.categories}
                      tags={product?.tags}
                    />
                  );
                })}
              </div>
            </PageSection>
          );
        })}
      </div>
      {/* Search All */}
      <div>
        <Button
          as={Link}
          href="/search"
          color="primary"
          className=""
          endContent={<IconArrowRight />}
        >
          Search More
        </Button>
      </div>
      {/* Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
        )}
      />
    </section>
  );
}
