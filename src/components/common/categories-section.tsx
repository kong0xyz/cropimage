import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import * as React from 'react'

interface Category {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
}

export function CategoriesSection({ categories = [] }: { categories: Category[] }) {
    return (
        <section>
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
        <div
            className={cn(
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

                <div className="gap-3 border-t border-dashed pt-6">
                    <Button variant="outline">
                        <Link className='flex items-center gap-1' href={link}>
                            See More
                            <ChevronRight className="ml-0 !size-3.5 opacity-50" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
