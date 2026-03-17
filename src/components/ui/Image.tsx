"use client";

import { cn } from "@buildd/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
import NextImage, { ImageProps } from "next/image";
import React, { useState, useCallback, useMemo } from "react";
import { Skeleton } from "./skeleton";

type IProps = Omit<ImageProps, "src"> & {
  src: string | undefined;
  fallback?: string;
  showLoader?: boolean;
  wrapperClasses?: string;
  eager?: boolean;
};

// Base64 gray placeholder
const BASE64_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='%23999' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

// Validate image URLs
const isValidImage = (src: string | undefined): boolean => {
  if (!src || typeof src !== "string") return false;
  if (src.includes("undefined") || src.includes("null")) return false;
  if (src.length <= 5) return false;
  return (
    src.startsWith("data:") ||
    src.startsWith("http") ||
    src.startsWith("/") ||
    src.startsWith("blob:")
  );
};

const Image = ({
  src,
  alt,
  showLoader = true,
  wrapperClasses = "",
  fallback = "/images/placeholder.svg",
  priority = false,
  eager = false,
  loading = "lazy",
  ...props
}: IProps) => {
  const shouldUsePlaceholder = !isValidImage(src);

  const [isLoading, setIsLoading] = useState(!shouldUsePlaceholder);
  const [imgError, setImgError] = useState(false);

  const handleOnError = useCallback(() => {
    if (!imgError) setImgError(true);
    setIsLoading(false);
  }, [imgError]);

  const handleOnLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Determine final src
  const finalSrc = useMemo(() => {
    if (shouldUsePlaceholder || imgError) {
      return !imgError && isValidImage(fallback)
        ? fallback
        : BASE64_PLACEHOLDER;
    }
    return src!;
  }, [src, fallback, imgError, shouldUsePlaceholder]);

  const isShowingPlaceholder = useMemo(
    () => shouldUsePlaceholder || imgError || finalSrc === BASE64_PLACEHOLDER,
    [shouldUsePlaceholder, imgError, finalSrc],
  );

  const shouldShowSkeleton = showLoader && isLoading && !isShowingPlaceholder;
  const loadingStrategy = priority || eager ? "eager" : loading;

  return (
    <div className={cn("relative", wrapperClasses)}>
      {shouldShowSkeleton && (
        <Skeleton className="absolute bottom-0 left-0 z-10 h-full w-full !rounded-none" />
      )}
      <NextImage
        {...props}
        src={finalSrc}
        alt={alt || "Image"}
        width={props.width}
        height={props.height}
        priority={priority}
        loading={loadingStrategy}
        quality={isShowingPlaceholder ? 75 : 90}
        unoptimized={finalSrc.startsWith("data:")}
        onLoad={handleOnLoad}
        onError={handleOnError}
        className={cn(
          "transition-opacity duration-300",
          isShowingPlaceholder && "object-contain",
          isLoading && !isShowingPlaceholder ? "opacity-0" : "opacity-100",
          props.className,
        )}
        style={{
          maxWidth: isShowingPlaceholder ? "100%" : undefined,
          maxHeight: isShowingPlaceholder ? "100%" : undefined,
          margin: isShowingPlaceholder ? "auto" : undefined,
          ...props.style,
        }}
      />
    </div>
  );
};

export { Image };
