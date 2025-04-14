import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import React from "react";
import { ReactNode } from "react";

interface Item {
  key: string;
  label: string;
  href?: string;
  icon?: ReactNode;
}

export default function CommonBreadcrumbs({
  items,
}: Readonly<{
  items: Item[];
}>) {
  return (
    <div className="h-8">
      <Breadcrumb>
        <BreadcrumbList>
          {items?.map((item: Item, index: number) => {
            return (
              <React.Fragment key={item.key}>
                {index != 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
                <BreadcrumbItem key={item.key}>
                  {index != items?.length - 1 ? (
                    <BreadcrumbLink href={item.href}>
                      <Button variant="ghost">
                        {item.icon}
                        {item.label}
                      </Button>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      <div className="flex flex-nowrap gap-1 items-center">
                        {item.icon}
                        {item.label}
                      </div>
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
