import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../utils/api";
import { formatCategory } from "../utils/helpers";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Products(){
  const { data: products, loading, error, retry } = useFetch(getProducts);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const category = searchParams.get("category") || "all";
  
  const changeCategory = (value) => {
    if (value === "all") setSearchParams({});
    else setSearchParams({ category: value });
  };

  const clearFilters = () => {
    setSearch("");
    setSort("default");
    setMinPrice("");
    setMaxPrice("");
    setSearchParams({});
  };
  
  
  const categories = useMemo(
    () => (products ? [...new Set(products.map((p) => p.category))] : []),
    [products]
  );

  const filtered = useMemo(() => {
    if (!products) return [];

    let list = products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase().trim());
      const matchCategory = category === "all" || p.category === category;
      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
      return matchSearch && matchCategory && matchMin && matchMax;
    });
    
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    
    return list;
}, [products, search, category, minPrice, maxPrice, sort]);

  if (loading) return <Loader text="Loading products..." />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <div className="container">
      <h1 className="page-title">All Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input search-input"
        />

        <select
          value={category}
          onChange={(e) => changeCategory(e.target.value)}
          className="filter-input"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {formatCategory(cat)}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="filter-input price-input"
        />
        <input
          type="number"
          placeholder="Max ₹"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="filter-input price-input"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="filter-input"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name: A to Z</option>
        </select>

        <button className="btn btn-outline" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <p className="result-count">{filtered.length} products found</p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No products found"
          text="Try changing your search or filters."
        />
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );


}