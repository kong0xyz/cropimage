import { docs, blog } from "$/.source";
import { loader } from "fumadocs-core/source";
import { fumadocsI18n } from "@/config/i18n";

export const source = loader({
  baseUrl: "/docs",
  i18n: fumadocsI18n,
  source: docs.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: "/blog",
  i18n: fumadocsI18n,
  source: blog.toFumadocsSource(),
});
