import { docs } from "$/.source";
import { loader } from "fumadocs-core/source";
import { i18n } from "./fumadocs-i18n";

export const source = loader({
  baseUrl: "/docs",
  i18n: i18n,
  source: docs.toFumadocsSource(),
});
