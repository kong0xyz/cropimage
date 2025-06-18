import React from "react";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface BreadcrumbSibling {
    key: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

export interface BreadcrumbItemData {
    key: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    siblings?: BreadcrumbSibling[]; // 当前级的兄弟页面（不含自己）
}

export interface PageBreadcrumbProps {
    items: BreadcrumbItemData[];
    className?: string;
}

export const PageBreadcrumb = ({ items, className }: PageBreadcrumbProps) => {
    return (
        <div className={className ?? "h-8"}>
            <Breadcrumb>
                <BreadcrumbList>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        const hasSiblings = item.siblings && item.siblings.length > 0;
                        return (
                            <React.Fragment key={item.key}>
                                {index !== 0 && <BreadcrumbSeparator />}
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>
                                            <div className="flex flex-nowrap gap-1 items-center">
                                                {item.icon}
                                                {item.label}
                                            </div>
                                        </BreadcrumbPage>
                                    ) : hasSiblings ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <span>
                                                    <BreadcrumbLink href={item.href} asChild>
                                                        <Button variant="ghost" className="flex items-center gap-1 px-2 py-1 text-sm">
                                                            {item.icon}
                                                            {item.label}
                                                            <ChevronDown className="size-4 ml-1" />
                                                        </Button>
                                                    </BreadcrumbLink>
                                                </span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                {item.siblings?.map((sib) => (
                                                    <DropdownMenuItem key={sib.key} asChild>
                                                        <a href={sib.href} className="flex items-center gap-2">
                                                            {sib.icon}
                                                            {sib.label}
                                                        </a>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <BreadcrumbLink href={item.href} asChild>
                                            <Button variant="ghost" className="flex items-center gap-1 px-2 py-1 text-sm">
                                                {item.icon}
                                                {item.label}
                                            </Button>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default PageBreadcrumb; 