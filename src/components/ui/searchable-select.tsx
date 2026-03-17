"use client";

import * as React from "react";
import { Check, ChevronDown, Loader2, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@buildd/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const searchableSelectTriggerVariants = cva(
  "flex h-10 w-full items-center justify-between rounded border border-slate-200 bg-white px-3 py-2 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/20",
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        success:
          "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
      },
      size: {
        sm: "h-9 px-2 text-xs",
        default: "h-10 px-3",
        lg: "h-11 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SearchableSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  keywords?: string[];
}

export interface SearchableSelectProps extends VariantProps<
  typeof searchableSelectTriggerVariants
> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingText?: string;
  options: SearchableSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  wrapperClassName?: string;
  className?: string;
  contentClassName?: string;
  clearable?: boolean;
  loading?: boolean;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderOption?: (
    option: SearchableSelectOption,
    selected: boolean,
  ) => React.ReactNode;
  renderValue?: (option: SearchableSelectOption | undefined) => React.ReactNode;
}

const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  SearchableSelectProps
>(
  (
    {
      label,
      error,
      helperText,
      placeholder = "Select an option",
      searchPlaceholder = "Search...",
      emptyMessage = "No option found.",
      loadingText = "Loading options...",
      options,
      value,
      defaultValue,
      onValueChange,
      search,
      onSearchChange,
      disabled = false,
      id,
      name,
      required = false,
      wrapperClassName,
      className,
      contentClassName,
      clearable = false,
      loading = false,
      isLoading = false,
      open,
      onOpenChange,
      variant,
      size,
      renderOption,
      renderValue,
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperTextId = helperText ? `${selectId}-helper` : undefined;
    const isControlled = value !== undefined;
    const isOpenControlled = open !== undefined;
    const hasExternalSearch =
      search !== undefined || onSearchChange !== undefined;

    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? "",
    );
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [internalSearch, setInternalSearch] = React.useState("");

    const selectedValue = isControlled ? (value ?? "") : internalValue;
    const isOpen = isOpenControlled ? open : internalOpen;
    const searchValue = search ?? internalSearch;
    const resolvedLoading = loading || isLoading;
    const resolvedVariant = error ? "error" : variant;

    const selectedOption = React.useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue],
    );

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange],
    );

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (!isOpenControlled) {
          setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
      },
      [isOpenControlled, onOpenChange],
    );

    const handleSelect = React.useCallback(
      (nextValue: string) => {
        handleValueChange(nextValue);
        handleOpenChange(false);
      },
      [handleOpenChange, handleValueChange],
    );

    const handleSearchChange = React.useCallback(
      (nextSearch: string) => {
        if (search === undefined) {
          setInternalSearch(nextSearch);
        }

        onSearchChange?.(nextSearch);
      },
      [onSearchChange, search],
    );

    const handleClear = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        handleValueChange("");
      },
      [handleValueChange],
    );

    return (
      <div className={cn("flex w-full flex-col gap-2", wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium leading-none text-slate-600"
          >
            {label}
            {required && <span className="pl-1 text-red-500">*</span>}
          </label>
        )}

        <Popover open={isOpen} onOpenChange={handleOpenChange}>
          <div className="relative w-full">
            {name ? (
              <input type="hidden" name={name} value={selectedValue} />
            ) : null}

            <PopoverTrigger asChild>
              <button
                ref={ref}
                id={selectId}
                type="button"
                role="combobox"
                aria-expanded={isOpen}
                aria-describedby={cn(errorId, helperTextId)}
                aria-invalid={!!error}
                disabled={disabled}
                className={cn(
                  searchableSelectTriggerVariants({
                    variant: resolvedVariant,
                    size,
                  }),
                  "text-left",
                  selectedOption ? "text-slate-900" : "text-slate-400",
                  clearable && selectedOption && "pr-18",
                  className,
                )}
              >
                <span className="line-clamp-1 flex-1">
                  {renderValue
                    ? renderValue(selectedOption)
                    : selectedOption?.label || placeholder}
                </span>

                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>

            {clearable && selectedOption && !disabled ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1 rounded px-1 text-xs text-slate-500 transition-colors hover:text-red-500"
                aria-label="Clear selected value"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <PopoverContent
            align="start"
            className={cn(
              "w-[var(--radix-popover-trigger-width)] p-0",
              contentClassName,
            )}
          >
            <Command shouldFilter={!resolvedLoading && !hasExternalSearch}>
              <CommandInput
                placeholder={searchPlaceholder}
                value={hasExternalSearch ? searchValue : undefined}
                onValueChange={
                  hasExternalSearch ? handleSearchChange : undefined
                }
              />
              <CommandList>
                {resolvedLoading ? (
                  <div className="flex items-center gap-2 px-3 py-6 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {loadingText}
                  </div>
                ) : (
                  <>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => {
                        const selected = option.value === selectedValue;

                        return (
                          <CommandItem
                            key={option.value}
                            value={`${option.label} ${option.value}`}
                            keywords={option.keywords}
                            disabled={option.disabled}
                            onSelect={() => handleSelect(option.value)}
                            className="cursor-pointer"
                          >
                            {renderOption ? (
                              <div className="flex w-full items-center justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  {renderOption(option, selected)}
                                </div>
                                <Check
                                  className={cn(
                                    "h-4 w-4 shrink-0",
                                    selected ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </div>
                            ) : (
                              <>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-medium">
                                    {option.label}
                                  </p>
                                  {option.description ? (
                                    <p className="truncate text-xs text-slate-500">
                                      {option.description}
                                    </p>
                                  ) : null}
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4 shrink-0",
                                    selected ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </>
                            )}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {error ? (
          <p id={errorId} className="text-sm text-red-500">
            {error}
          </p>
        ) : null}

        {helperText && !error ? (
          <p id={helperTextId} className="text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

SearchableSelect.displayName = "SearchableSelect";

export { SearchableSelect, searchableSelectTriggerVariants };
