import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons for show/hide

// Toast Handlers
const handleError = (message) => toast.error(message);
const handleSuccess = (message) => toast.success(message);

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Reset error message on input change
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    // Email validation
    if (!loginInfo.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginInfo.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    // Password validation
    if (!loginInfo.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    setLoading(true);

    const { email, password } = loginInfo;
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`; // API endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000); // Redirect to home
      } else {
        // Handle specific error messages from backend
        if (error && error.includes("Invalid email")) {
          setErrors({ ...errors, email: "Incorrect email address." });
        } else if (error && error.includes("Invalid password")) {
          setErrors({ ...errors, password: "Incorrect password." });
        } else if (error && error.includes("Authentication failed")) {
          handleError("Authentication failed. Please check your credentials.");
        } else {
          handleError(message || "Login failed.");
        }
      }
    } catch (err) {
      handleError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-primary">Login</h3>
          <form onSubmit={handleLogin}>
            {/* Email Address */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-control"
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle the icon */}
                </button>
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>

            {/* Forgot Password Button */}
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-decoration-none text-primary fw-bold">
                Forgot Password?
              </Link>
            </div>

            {/* Signup Link */}
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-decoration-none text-primary fw-bold">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
