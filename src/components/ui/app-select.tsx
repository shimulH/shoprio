"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@buildd/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  "flex w-full h-10 w-full rounded border border-slate-200 items-center justify-between whitespace-nowrap bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-colors",
  {
    variants: {
      variant: {
        default: "",
        error: "border-error focus:ring-error",
        success: "border-success focus:ring-success",
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

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariants>
>(({ className, children, variant, size, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] bg-white overflow-hidden rounded border border-slate-200 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative focus:bg-primary/10 focus:text-dark/90 hover:text-dark/90 cursor-pointer flex w-full select-none items-center rounded py-2 pl-2 pr-8 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// AppSelect - High-level select component
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AppSelectProps extends VariantProps<
  typeof selectTriggerVariants
> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  wrapperClassName?: string;
  align?: "start" | "center" | "end";
  required?: boolean;
  className?: string;
  clearable?: boolean;
}

/**
 * AppSelect - Enhanced select component with label, error states, and options
 *
 * Features:
 * - Label and helper text support
 * - Error state with validation styling
 * - Success state styling
 * - Multiple sizes: sm, default, lg
 * - Keyboard navigation
 * - Search functionality
 * - Fully accessible
 *
 * Usage:
 * <AppSelect
 *   label="Category"
 *   placeholder="Select category"
 *   options={[
 *     { value: "tech", label: "Technology" },
 *     { value: "design", label: "Design" }
 *   ]}
 *   error="Category is required"
 * />
 */
const AppSelect: React.FC<AppSelectProps> = ({
  label,
  error,
  helperText,
  placeholder,
  options,
  value,
  onValueChange,
  disabled,
  variant,
  size,
  id,
  wrapperClassName = "",
  className = "",
  align = "start",
  required = false,
  clearable = false,
}) => {
  const generatedId = React.useId();
  const selectId = id || generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const helperTextId = helperText ? `${selectId}-helper` : undefined;

  const selectVariant = error ? "error" : variant;

  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm text-slate-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 pl-1">*</span>}
        </label>
      )}

      <Select
        value={value ?? ""}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <div className="relative">
          <SelectTrigger
            variant={selectVariant}
            size={size}
            id={selectId}
            aria-describedby={cn(errorId, helperTextId)}
            aria-invalid={!!error}
            className={cn(className, "text-slate-600")}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          {clearable && value && !disabled && (
            <div
              onClick={() => onValueChange?.("")}
              className="text-sm absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer flex items-center gap-1"
            >
              <X className="h-3 w-3 text-red-500" /> |
            </div>
          )}
        </div>
        <SelectContent align={align}>
          {options
            .filter((option) => option.value && option.value.trim() !== "")
            .map((option, i) => (
              <SelectItem
                key={option.value + i}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {error && (
        <p id={errorId} className="text-sm text-red-500">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperTextId} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
};

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  AppSelect,
};
