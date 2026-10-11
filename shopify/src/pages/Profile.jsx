import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }
    updateUser({
      name: form.name.trim(),
      phone: form.phone,
      address: form.address.trim(),
    });
    setSaved(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <h3>{user?.name}</h3>
          <p className="profile-email">{user?.email}</p>
          <p className="profile-stat">{orders.length} orders placed</p>
          <Link to="/orders" className="btn btn-outline profile-btn">
            View My Orders
          </Link>
          <button className="btn profile-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <form className="form-card profile-form" onSubmit={handleSave} noValidate>
          <h3>Edit Details</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={user?.email || ""} disabled />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (10 digits)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, city, pincode"
            />
          </div>

          {error && <span className="form-error">{error}</span>}
          {saved && <span className="form-success">✓ Profile updated</span>}

          <button type="submit" className="btn form-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}