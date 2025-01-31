import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const [userName, setUserName] = useState("");  // Store user's name
  const navigate = useNavigate();

  // Retrieve data from localStorage whenever the component is loaded
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("loggedInUser");
    if (token) {
      setIsLoggedIn(true);  // User is logged in
      setUserName(name);  // Set username
    } else {
      setIsLoggedIn(false);  // If no token, user is logged out
    }
  }, []);  // Empty array ensures this effect runs once when component mounts

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove token
    localStorage.removeItem("loggedInUser");  // Remove user name
    setIsLoggedIn(false);  // Update login state
    setUserName("");  // Clear user name
    navigate("/login");  // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/">Document</Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold px-3" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold px-3" to="/xyz">Document</Link>
            </li>
          </ul>

          {/* Buttons (Responsive) */}
          <div className="d-flex ms-3">
            {isLoggedIn ? (
              <>
                {/* Display user name and logout button on larger screens */}
                <span className="navbar-text me-3 text-primary fw-bold d-none d-lg-block">
                  Hi, {userName}
                </span>
                <button className="btn btn-outline-danger fw-semibold d-none d-lg-block" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                {/* Show login and signup buttons */}
                <Link to="/login" className="btn btn-outline-primary me-2 fw-semibold d-none d-sm-block">Log In</Link>
                <Link to="/signup" className="btn btn-primary fw-semibold d-none d-sm-block">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
