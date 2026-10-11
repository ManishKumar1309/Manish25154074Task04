const BASE_URL = "https://dummyjson.com";

const normalize = (p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  price: p.price,
  category: p.category,
  brand: p.brand || "",
  image: p.thumbnail,
  images: p.images?.length ? p.images : [p.thumbnail],
  rating: p.rating,
  stock: p.stock,
  discount: p.discountPercentage,
});

async function request(path) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new Error("Network error. Please check your internet connection.");
  }
  if (res.status === 404) throw new Error("Product not found.");
  if (!res.ok) throw new Error(`Server error (${res.status}). Please try again.`);
  return res.json();
}

let productsCache = null;

export async function getProducts() {
  if (productsCache) return productsCache;
  const data = await request("/products?limit=100");
  productsCache = data.products.map(normalize);
  return productsCache;
}

export async function getProduct(id) {
  const data = await request(`/products/${id}`);
  return normalize(data);
}