import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isLoggedIn, user } = useAuth();

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={close}>
          🛍️ Shopify
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/products" onClick={close}>Products</NavLink>
          <NavLink to="/wishlist" onClick={close}>
            Wishlist ({wishlist.length})
          </NavLink>
          <NavLink to="/cart" onClick={close}>Cart ({cartCount})</NavLink>
          {isLoggedIn && (
            <NavLink to="/orders" onClick={close}>Orders</NavLink>
          )}
          {isLoggedIn ? (
            <NavLink to="/profile" onClick={close}>
              👤 {user?.name?.split(" ")[0] || "Profile"}
            </NavLink>
          ) : (
            <NavLink to="/login" onClick={close}>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}