"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  value?: Option[];
  onChange?: (options: Option[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "选择选项...",
  className,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (option: Option) => {
    const newValue = value?.filter((item) => item.value !== option.value);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && value.length > 0) {
          const newValue = [...value];
          newValue.pop();
          onChange?.(newValue);
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  };

  const selectables = options?.filter(
    (option) => !value.some((item) => item.value === option.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
    >
      <div className="group border border-input px-3 py-2 rounded-md flex gap-1 flex-wrap">
        {value?.map((option) => (
          <Badge
            key={option.value}
            className="flex items-center gap-1"
            variant="secondary"
          >
            {option.label}
            <button
              className="rounded-sm"
              aria-label={`删除选项 ${option.label}`}
              title={`删除选项 ${option.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnselect(option);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleUnselect(option)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">删除 {option.label}</span>
            </button>
          </Badge>
        ))}
        <CommandPrimitive.Input
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="ml-2 flex-1 outline-none bg-transparent placeholder:text-muted-foreground"
        />
      </div>
      <div className="relative">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
            <CommandGroup className="h-full overflow-auto max-h-52">
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    onChange?.([...value, option]);
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
} 