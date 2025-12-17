"use client";

import React from "react";
import { List } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { PromoContent } from "@/components/blog/promo-content";

export function MobileTableOfContents() {
  return (
    <Drawer>
      <DrawerTrigger className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
        <List size={20} />
      </DrawerTrigger>

      <DrawerContent className="lg:hidden">
        <DrawerHeader>
          <h3 className="font-semibold">Table of Contents</h3>
        </DrawerHeader>

        <div className="px-4">
          <TableOfContents />
        </div>

        <DrawerFooter>
          <PromoContent variant="mobile" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
