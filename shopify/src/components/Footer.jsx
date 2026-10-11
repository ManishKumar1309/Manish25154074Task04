import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>🛍️ Shopify</h3>
          <p>Your one-stop shop for everything you love.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} Shopify. All rights reserved.
      </p>
    </footer>
  );
}