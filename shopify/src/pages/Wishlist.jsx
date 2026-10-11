import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import WishlistItem from "../components/WishlistItem";
import EmptyState from "../components/EmptyState";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container">
        <EmptyState
          icon="💔"
          title="Your wishlist is empty"
          text="Tap the heart on any product to save it here."
          actionText="Browse Products"
          actionTo="/products"
        />
      </div>
    );
  }

  // sirf in-stock products cart mein jayenge
  const moveAllToCart = () => {
    wishlist
      .filter((p) => p.stock !== 0)
      .forEach((p) => {
        addToCart(p);
        removeFromWishlist(p.id);
      });
  };

  return (
    <div className="container">
      <div className="cart-header">
        <h1 className="page-title">My Wishlist ({wishlist.length})</h1>
        <button className="btn btn-outline" onClick={moveAllToCart}>
          Move All to Cart
        </button>
      </div>

      <div className="product-grid">
        {wishlist.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}