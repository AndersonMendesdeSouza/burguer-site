import type { SyntheticEvent } from "react";

const PLACEHOLDER_IMAGE = "/product-placeholder.svg";

export function getOrderImageUrl(imageUrl?: string | null): string {
  const source = imageUrl?.trim();
  if (!source) return PLACEHOLDER_IMAGE;

  try {
    const url = new URL(source, window.location.origin);

    if (url.pathname === "/uploads" || url.pathname.startsWith("/uploads/")) {
      return PLACEHOLDER_IMAGE;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return PLACEHOLDER_IMAGE;
    }

    return source;
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}

export function handleOrderImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.getAttribute("src") === PLACEHOLDER_IMAGE) return;

  image.src = PLACEHOLDER_IMAGE;
}
