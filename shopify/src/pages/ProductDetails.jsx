import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getProduct } from "../utils/api";
import { formatPrice, formatCategory } from "../utils/helpers";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error, retry } = useFetch(
    () => getProduct(id),
    [id]
  );

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setActiveImg(0);
    setAdded(false);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

    if (loading) return <Loader text="Loading product..." />;
  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={retry} />
        <p style={{ textAlign: "center" }}>
          <Link to="/products" className="btn btn-outline">
            Back to Products
          </Link>
        </p>
      </div>
    );
  }
  if (!product) return null;

  const wished = isInWishlist(product.id);
  const inStock = product.stock > 0;

  return (
    <div className="container">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="details">
        <div className="details-gallery">
          <div className="details-main-img">
            <img src={product.images[activeImg]} alt={product.title} />
          </div>
          <div className="details-thumbs">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`thumb ${index === activeImg ? "active" : ""}`}
                onClick={() => setActiveImg(index)}
              >
                <img src={img} alt={`${product.title} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="details-info">
          <span className="card-category">
            {formatCategory(product.category)}
            {product.brand && ` • ${product.brand}`}
          </span>
          <h1>{product.title}</h1>

          <div className="details-rating">⭐ {product.rating?.toFixed(1)} / 5</div>

          <div className="details-price">{formatPrice(product.price)}</div>

          <p className="details-desc">{product.description}</p>

          <p className={inStock ? "stock in" : "stock out"}>
            {inStock ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>

          {inStock && (
            <div className="qty-box">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}

          <div className="details-actions">
            <button
              className="btn"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => toggleWishlist(product)}
            >
              {wished ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}