import { CategoryHeader } from "@/components/blog/blog-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getCategoriesWithCount } from "@/lib/blog";
import { constructMetadata } from "@/lib/seoutils";
import { ArrowLeft, Folder, Hash } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.category" });

  return constructMetadata({
    title: t("allCategories"),
    description: t("allCategoriesDescription", { count: 0 }),
    pathname: "/blog/categories",
  });
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const categoriesWithCount = getCategoriesWithCount(locale);

  // 获取翻译
  const t = await getTranslations({ locale, namespace: "blog" });
  const tCategory = await getTranslations({
    locale,
    namespace: "blog.category",
  });

  // 按文章数量排序
  const sortedCategories = [...categoriesWithCount].sort(
    (a, b) => b.count - a.count
  );

  return (
    <div className="categories-page w-full">
      <CategoryHeader
        categoriesCount={categoriesWithCount.length}
        locale={locale}
      />

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4">
        {categoriesWithCount.length > 0 ? (
          <div>
            {/* 所有分类网格 */}
            <section>
              <div className="flex justify-center">
                <div
                  className={`grid gap-4 ${
                    sortedCategories.length === 1
                      ? "grid-cols-1 max-w-xs"
                      : sortedCategories.length === 2
                        ? "grid-cols-1 md:grid-cols-2 max-w-xl"
                        : sortedCategories.length === 3
                          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-3xl"
                          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl"
                  } w-full`}
                >
                  {sortedCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog/category/${encodeURIComponent(category.name)}`}
                      className="block group"
                    >
                      <Card className="h-full border hover:border-primary/50 hover:shadow-sm transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-primary" />
                              <span className="font-medium group-hover:text-primary transition-colors">
                                {category.name}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {category.count}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <Card className="bg-linear-to-br from-muted/30 to-muted/10 border-dashed border-border">
            <CardContent className="p-16 text-center">
              <div className="inline-flex items-center justify-center p-6 bg-muted/50 rounded-full mb-6">
                <Folder className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {tCategory("noCategoriesTitle")}
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                {tCategory("noCategoriesDescription")}
              </p>
              <Button asChild size="lg">
                <Link href={`/blog`}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t("backToBlog")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
