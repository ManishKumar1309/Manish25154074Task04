export const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export const formatCategory = (slug = "") =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    export const FREE_SHIPPING_ABOVE = 500;
export const SHIPPING_FEE = 15;

export const getShipping = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;