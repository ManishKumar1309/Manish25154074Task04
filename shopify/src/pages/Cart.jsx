import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, getShipping, FREE_SHIPPING_ABOVE } from "../utils/helpers";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          text="Looks like you haven't added anything yet."
          actionText="Start Shopping"
          actionTo="/products"
        />
      </div>
    );
  }

  const shipping = getShipping(cartTotal);
  const grandTotal = cartTotal + shipping;

  return (
    <div className="container">
      <div className="cart-header">
        <h1 className="page-title">Shopping Cart ({cartCount})</h1>
        <button className="btn btn-outline" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="summary-note">
              Add {formatPrice(FREE_SHIPPING_ABOVE - cartTotal)} more for free
              shipping
            </p>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <Link to="/checkout" className="btn summary-btn">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}