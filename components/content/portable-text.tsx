import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import CodeBlock from "./code-block";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }

        return (
          <Image
            alt={value.alt || " "}
            loading="lazy"
            height={value.height || 400}
            width={value.width || 600}
            src={urlForImage(value)?.url() || ""}
            style={{
              width: "100%",
              marginBottom: "24px",
            }}
          />
        );
      },
      code: ({ value }: any) => {
        return <CodeBlock value={value} />;
      },
    },
    block: {
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold">{children}</h6>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a href={value?.href} rel="noreferrer noopener">
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div
      className={["prose md:prose-xl dark:prose-invert", className]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
