export const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export const formatCategory = (slug = "") =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");