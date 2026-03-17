import { cn } from "@buildd/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-dark/5 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
