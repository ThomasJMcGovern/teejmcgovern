"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Image with a designed fallback tile when the asset is missing (some portfolio
 * assets are wired in a later task). Caller sizes the wrapper (needs a height).
 */
export function SafeImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [error, setError] = useState(false);
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-chrome-mid)]",
        className,
      )}
    >
      {error ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-desk-2)] to-[var(--color-desk-3)] p-2 text-center">
          <span className="font-ui text-[11px] leading-tight text-white/85">
            {alt}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn("object-cover", imgClassName)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
