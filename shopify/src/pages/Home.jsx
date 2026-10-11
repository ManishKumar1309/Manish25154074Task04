import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../utils/api";
import { formatCategory } from "../utils/helpers";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const { data: products, loading, error, retry } = useFetch(getProducts);

  const categories = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  const featured = products
    ? [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
    : [];

      return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Discover Products You'll Love</h1>
          <p>Latest smartphones, laptops, tablets and accessories at great prices.</p>
          <Link to="/products" className="btn btn-light">
            Shop Now
          </Link>
        </div>
      </section>

      <div className="container">
        {loading && <Loader text="Loading products..." />}

        {error && <ErrorMessage message={error} onRetry={retry} />}

        {!loading && !error && products?.length === 0 && (
          <EmptyState
            title="No products available"
            text="Please check back later."
          />
        )}

        {!loading && !error && products?.length > 0 && (
          <>
            <h2 className="section-title">Shop by Category</h2>
            <div className="category-grid">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${cat}`}
                  className="category-card"
                >
                  {formatCategory(cat)}
                </Link>
              ))}
            </div>

            <h2 className="section-title">Featured Products</h2>
            <div className="product-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}