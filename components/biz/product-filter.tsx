"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { SharedSelection } from "@heroui/system";
import { debounce } from "lodash";
import { CircleXIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductFilter = ({
  categories,
  tags,
}: {
  categories: any[];
  tags: any[];
}) => {
  // sort
  const sorts = [
    {
      value: "title",
      label: "Title Asc",
    },
    {
      value: "-title",
      label: "Title Desc",
    },
  ];

  //
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParams = searchParams.getAll("category");
  const tagParams = searchParams.getAll("tag");
  const queryParam = searchParams.get("query");
  const sortParam = searchParams.get("sort");

  const [categoryOpend, setCategoryOpend] = useState(false);
  const [tagOpend, setTagOpend] = useState(false);

  // values
  const [categoryValues, setCategoryValues] = useState(
    new Set<string>([...categoryParams])
  );
  const [tagValues, setTagValues] = useState(new Set<string>([...tagParams]));
  const [queryValue, setQueryValue] = useState(queryParam ?? "");
  const [sortValue, setSortValue] = useState(
    new Set<string>(sortParam ? [sortParam] : [])
  );

  // handle search
  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    // category
    categoryValues.forEach((category) => {
      searchParams.append("category", category);
    });

    tagValues.forEach((tag) => {
      searchParams.append("tag", tag);
    });

    // input search
    if (queryValue) {
      searchParams.set("query", queryValue.toString());
    } else {
      searchParams.delete("query");
    }

    // input search
    if (sortValue) {
      sortValue.forEach((sort) => {
        searchParams.set("sort", sort);
      });
    } else {
      searchParams.delete("sort");
    }

    router.push(`/search?${searchParams.toString()}`, { scroll: false });
  };
  const debounceHandleSearch = debounce(() => {
    console.log("debounceHandleSearch");
    handleSearch();
  }, 500);

  useEffect(() => {
    debounceHandleSearch();
    return () => {
      debounceHandleSearch.cancel();
    };
  }, [categoryValues, tagValues, sortValue, queryValue]);

  // handle reset
  const handleReset = () => {
    setCategoryValues(new Set<string>());
    setTagValues(new Set<string>());
    setSortValue(new Set<string>());
    setQueryValue("");

    router.push(`/search`, { scroll: false });
  };

  return (
    <div className="relative flex flex-col md:flex-row md:pt-8 md:justify-between gap-2">
      {/* category */}
      <div className="flex w-full flex-col gap-2">
        <Select
          isOpen={categoryOpend}
          onOpenChange={(isOpen: boolean) => {
            setCategoryOpend(isOpen);
          }}
          disableAnimation
          radius="sm"
          variant="bordered"
          label="Categories"
          labelPlacement="outside"
          selectedKeys={categoryValues}
          selectionMode="multiple"
          onSelectionChange={(keys: SharedSelection) => {
            setCategoryValues(keys as Set<string>);
          }}
          endContent={
            categoryValues?.size > 0 && (
              <CircleXIcon
                size={18}
                onClick={() => {
                  setCategoryValues(new Set<string>());
                  setCategoryOpend(false);
                }}
              />
            )
          }
        >
          {categories?.map((category: any) => (
            <SelectItem key={category.slug}>{category.title}</SelectItem>
          ))}
        </Select>
      </div>
      {/* tag */}
      <div className="flex w-full flex-col gap-2">
        <Select
          isOpen={tagOpend}
          onOpenChange={(isOpen: boolean) => {
            setTagOpend(isOpen);
          }}
          disableAnimation
          radius="sm"
          variant="bordered"
          label="Tags"
          labelPlacement="outside"
          selectedKeys={tagValues}
          selectionMode="multiple"
          onSelectionChange={(keys) => {
            setTagValues(keys as Set<string>);
          }}
          endContent={
            tagValues?.size > 0 && (
              <CircleXIcon
                size={18}
                onClick={() => {
                  setTagValues(new Set<string>());
                  setTagOpend(false);
                }}
              />
            )
          }
        >
          {tags?.map((tag: any) => (
            <SelectItem key={tag.slug}>{tag.title}</SelectItem>
          ))}
        </Select>
      </div>
      {/* Sort */}
      <div className="flex w-full flex-col gap-2">
        <Select
          disableAnimation
          radius="sm"
          variant="bordered"
          label="Sort"
          labelPlacement="outside"
          selectedKeys={sortValue}
          onSelectionChange={(keys) => {
            setSortValue(keys as Set<string>);
          }}
        >
          {sorts?.map((sort: any) => (
            <SelectItem key={sort.value}>{sort.label}</SelectItem>
          ))}
        </Select>
      </div>
      {/* Search Input */}
      <div className="flex w-full flex-col md:flex-row gap-2 justify-end items-end">
        {/* Search Input */}
        <Input
          value={queryValue}
          disableAnimation
          isClearable
          className="w-full flex-1"
          variant="bordered"
          radius="sm"
          label="Keyword"
          aria-label="Keyword"
          onValueChange={setQueryValue}
          labelPlacement="outside"
          type="search"
        />

        {/*  */}
      </div>
      <div className="self-end w-full md:w-40 inline-flex flex-row gap-2 h-10 mt-4">
        <Button
          disableAnimation
          className="w-full"
          radius="sm"
          variant="bordered"
          onPress={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
