import {
  categories,
  categoryTitle,
  categoryDescription,
} from "@/config/landing-page";

import { CategoriesSection } from "../common/categories-section";

export default function BasicCategories() {
  return (
    <section>
      <div className="flex flex-col items-center gap-4 text-center container mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center gap-4 px-4 pb-6">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {categoryTitle}
          </h2>
          <p className="max-w-[600px] text-md font-medium text-muted-foreground sm:text-xl">
            {categoryDescription}
          </p>
        </div>
        <CategoriesSection categories={categories} />
      </div>
    </section>
  );
}
