import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const maxQty = item.stock || 99;

  return (
    <div className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item-img">
        <img src={item.image} alt={item.title} />
      </Link>

      <div className="cart-item-info">
        <Link to={`/products/${item.id}`} className="cart-item-title">
          {item.title}
        </Link>
        <span className="cart-item-price">{formatPrice(item.price)}</span>

        <div className="qty-box">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= maxQty}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-side">
        <strong>{formatPrice(item.price * item.quantity)}</strong>
        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}