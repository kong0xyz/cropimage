import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Category {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
}

export function CategoriesSection({ categories = [] }: { categories: Category[] }) {
    return (
        <section className="w-full">
            <div className="mx-auto px-6">
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <IntegrationCard
                            key={category.title}
                            title={category.title}
                            description={category.description}
                            link={category.link}
                        >
                            {category.icon}
                        </IntegrationCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ title, description, children, link = '/' }: { title: string; description: string; children: React.ReactNode; link?: string }) => {
    return (
        <Link href={link} className={cn(
            "relative overflow-hidden rounded-2xl border p-6",
            "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
            "dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] md:p-8"
        )}
        >

            <div className="relative">
                <div className="size-10 mx-auto">{children}</div>

                <div className="space-y-2 py-6">
                    <h3 className="text-base font-medium">{title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
                </div>
            </div>
        </Link>
    )
}
