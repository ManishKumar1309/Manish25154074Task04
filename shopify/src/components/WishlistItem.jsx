import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice, formatCategory } from "../utils/helpers";

export default function WishlistItem({ product }) {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const outOfStock = product.stock === 0;

  // cart mein daalo aur wishlist se hata do
  const moveToCart = () => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="product-card">
      <button
        className="wish-btn"
        onClick={() => removeFromWishlist(product.id)}
        aria-label="Remove from wishlist"
      >
        ✕
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
        <div className="card-price">{formatPrice(product.price)}</div>

        <button
          className="btn move-btn"
          onClick={moveToCart}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of Stock" : "Move to Cart"}
        </button>
      </div>
    </div>
  );
}