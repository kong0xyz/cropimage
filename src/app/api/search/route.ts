import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";
import { createTokenizer as createZhTokenizer } from "@orama/tokenizers/mandarin";
import { createTokenizer as createJaTokenizer } from "@orama/tokenizers/japanese";
export const { GET } = createFromSource(source, undefined, {
  localeMap: {
    zh: {
      components: {
        tokenizer: createZhTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
    ja: {
      components: {
        tokenizer: createJaTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
  },
});
