import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

// Toast Handlers
const handleError = (message) => toast.error(message);
const handleSuccess = (message) => toast.success(message);

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Reset error message on input change
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Improved Email Validation with stricter regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    // Name validation: Only letters and spaces
    if (!signupInfo.name) {
      newErrors.name = "Full name is required.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(signupInfo.name)) {
      newErrors.name = "Full name must contain only letters and spaces.";
      isValid = false;
    }

    // Email validation
    if (!signupInfo.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(signupInfo.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    // Password validation
    if (!signupInfo.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (signupInfo.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/\d/.test(signupInfo.password)) {
      newErrors.password = "Password must contain at least one number.";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(signupInfo.password)) {
      newErrors.password = "Password must contain at least one special character.";
      isValid = false;
    } else if (!/[A-Za-z]/.test(signupInfo.password)) {
      newErrors.password = "Password must contain at least one alphabet.";
      isValid = false;
    }

    // Confirm Password validation
    if (!signupInfo.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (signupInfo.password !== signupInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) return;

    setLoading(true);

    const { name, email, password, confirmPassword } = signupInfo;
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/auth//signup`; // API endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000); // Redirect to login
      } else if (error) {
        const details = error?.details[0]?.message || "An error occurred.";
        handleError(details);
      } else {
        handleError(message || "Signup failed.");
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
          <h3 className="card-title text-center mb-4 text-primary">Sign Up</h3>
          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="name"
                value={signupInfo.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-control"
                autoFocus
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            {/* Email Address */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-control"
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={signupInfo.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Use icons here */}
                </button>
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupInfo.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Use icons here */}
                </button>
              </div>
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/login" className="text-decoration-none text-primary fw-bold">Login</Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
