import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@buildd/utils";

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      size: {
        sm: "min-h-[50px] px-2 py-1 text-xs",
        default: "min-h-[60px] px-3 py-2",
        lg: "min-h-[80px] px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface AppTextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
  required?: boolean;
}

/**
 * AppTextarea - Enhanced textarea component with label, error states, and character count
 *
 * Features:
 * - Label and helper text support
 * - Error state with validation styling
 * - Success state styling
 * - Character count display
 * - Multiple sizes: sm, default, lg
 * - Auto-resize option
 * - Fully accessible with proper labeling
 *
 * Usage:
 * <AppTextarea
 *   label="Description"
 *   placeholder="Enter description"
 *   maxLength={500}
 *   showCount
 *   error="Description is required"
 * />
 */
const AppTextarea = React.forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      maxLength,
      showCount,
      value,
      id,
      required = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperTextId = helperText ? `${textareaId}-helper` : undefined;

    const inputVariant = error ? "error" : variant;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm text-slate-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            className={cn(
              textareaVariants({
                variant: inputVariant,
                size,
                className,
              }),
            )}
            ref={ref}
            id={textareaId}
            aria-describedby={cn(errorId, helperTextId)}
            aria-invalid={!!error}
            maxLength={maxLength}
            value={value}
            {...props}
          />

          {showCount && maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-slate-400">
              {currentLength}/{maxLength}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-red-500">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
AppTextarea.displayName = "AppTextarea";

export { AppTextarea, textareaVariants };
