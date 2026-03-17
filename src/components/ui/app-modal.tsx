"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@buildd/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs  data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const modalVariants = cva(
  "fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-0 border border-slate-200 bg-white p-0 shadow-2xl duration-200 rounded-sm overflow-hidden data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100",
  {
    variants: {
      size: {
        sm: "sm:max-w-[600px]",
        default: "sm:max-w-[800px]",
        lg: "sm:max-w-[1000px]",
        xl: "sm:max-w-[1200px]",
        full: "sm:max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof modalVariants>
>(({ className, children, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalVariants({ size }), className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-80 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-slate-900 bg-slate-50 border-b border-slate-200 p-6 text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 bg-white border-t border-slate-200",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-800", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// AppModal - High-level modal component
export interface AppModalProps {
  // Preferred props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Back-compat props used in some feature modules
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  size?: VariantProps<typeof modalVariants>["size"];
  children: React.ReactNode;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
  disabled?: boolean;
}

/**
 * AppModal - Generic modal component with customizable size and content
 *
 * Features:
 * - Multiple sizes: sm, default, lg, xl, full
 * - Optional trigger element
 * - Header with title and description
 * - Footer for actions
 * - Accessible with keyboard navigation
 * - Backdrop blur effect
 *
 * Usage:
 * <AppModal
 *   title="Edit User"
 *   size="lg"
 *   trigger={<Button>Open Modal</Button>}
 *   footer={<Button>Save</Button>}
 * >
 *   Modal content here
 * </AppModal>
 */
const AppModal: React.FC<AppModalProps> = ({
  open,
  onOpenChange,
  isOpen,
  onClose,
  title,
  description,
  size = "default",
  children,
  footer,
  trigger,
  disabled = false,
}) => {
  // Support both prop styles
  const resolvedOpen = open ?? isOpen;
  const resolvedOnOpenChange =
    onOpenChange ??
    ((o: boolean) => {
      if (!o) onClose?.();
    });
  return (
    <Dialog open={resolvedOpen} onOpenChange={resolvedOnOpenChange}>
      {trigger && (
        <DialogTrigger asChild disabled={disabled}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        size={size}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {(title || description) && (
          <DialogHeader className="bg-slate-100 p-4">
            {title ? (
              <DialogTitle className="text-slate-900">{title}</DialogTitle>
            ) : (
              <DialogTitle className="sr-only">Modal</DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-slate-700">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="flex-1 bg-white overflow-y-auto max-h-[78vh]">
          {children}
        </div>
        {footer && (
          <DialogFooter className="bg-slate-50 border-t border-slate-200 p-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  AppModal,
};
