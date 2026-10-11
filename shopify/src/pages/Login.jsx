import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // simulated login: password store nahi karte, sirf user info
    login({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: "",
      address: "",
    });
  };

  // login ho gaya toh wapas bhej do
  if (isLoggedIn) return <Navigate to={redirectTo} replace />;

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h1>Welcome 👋</h1>
        <p className="form-sub">Login to continue shopping.</p>

        {location.state?.from && (
          <p className="form-notice">Please login to access that page.</p>
        )}

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            placeholder="Your name"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            placeholder="you@example.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            placeholder="Minimum 6 characters"
          />
          {errors.password && (
            <span className="form-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="btn form-btn">
          Login
        </button>
      </form>
    </div>
  );
}