import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@buildd/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded border border-slate-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500",
        success:
          "border-green-500 focus-visible:ring-green-500/20 focus-visible:border-green-500",
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

export interface AppInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  wrapperClassName?: string;
}

/**
 * AppInput - Enhanced input component with label, error states, and icons
 *
 * Features:
 * - Label and helper text support
 * - Error state with validation styling
 * - primary state styling
 * - Left and right icon slots
 * - Multiple sizes: sm, default, lg
 * - Fully accessible with proper labeling
 *
 * Usage:
 * <AppInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   error="Email is required"
 *   leftIcon={<Mail />}
 * />
 */
const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      className,
      variant,
      size,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      wrapperClassName = "",
      required = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    const inputVariant = error ? "error" : variant;
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={cn("flex flex-col w-full gap-2", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm text-slate-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            type={type === "password" && showPassword ? "text" : type}
            className={cn(
              inputVariants({ variant: inputVariant, size, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
            )}
            ref={ref}
            id={inputId}
            aria-describedby={cn(errorId, helperTextId)}
            aria-invalid={!!error}
            autoComplete="off"
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
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
AppInput.displayName = "AppInput";

export { AppInput, inputVariants };
