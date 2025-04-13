import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import CommonCardOffset from "@/components/common/common-card-offset";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
export default function CollectionItem({
  slug,
  title,
  description,
  count = 0,
  target = "_blank",
}: Readonly<{
  slug: string;
  title: string;
  description: string;
  count?: number;
  target?: string;
}>) {
  return (
    <CommonCardOffset>
      <div className="h-48 p-4 pb-2 flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-left line-clamp-2">
          <Link className="hover:underline" href={`/collection/${slug}`}>
            {title}
          </Link>
        </h2>
        <p className="line-clamp-3">{description}</p>
        <div className="flex flex-row justify-between items-center">
          <div>
            <Chip color="primary" variant="dot">
              {`${count} Items`}
            </Chip>
          </div>
          <div className="">
            <Button
              variant="light"
              radius="full"
              as={Link}
              isIconOnly
              href={`/collection/${slug}`}
              target={target}
            >
              <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </CommonCardOffset>
  );
}
