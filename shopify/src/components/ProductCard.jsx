import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice, formatCategory } from "../utils/helpers";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wished = isInWishlist(product.id);

  return (
    <div className="product-card">
      <button
        className={`wish-btn ${wished ? "active" : ""}`}
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
      >
        {wished ? "❤️" : "🤍"}
      </button>

      <Link to={`/products/${product.id}`} className="card-img">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="card-body">
        <span className="card-category">{formatCategory(product.category)}</span>
        <Link to={`/products/${product.id}`} className="card-title">
          {product.title}
        </Link>
        <div className="card-rating">⭐ {product.rating?.toFixed(1)}</div>
        <div className="card-bottom">
          <span className="card-price">{formatPrice(product.price)}</span>
          <button className="btn btn-sm" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}