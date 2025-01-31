import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5"> {/* Using bg-dark for dark gray background */}
      <div className="container">
        {/* Top Section: Company Info and Logo */}
        <div className="row justify-content-between align-items-center mb-4">
          <div className="col-md-6 text-center text-md-start">
            <h5 className="mb-3">Your Company</h5>
            <p className="mb-0">
              Empowering your journey with quality products and services. Follow us on our social channels for updates and offers.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <img
              src="https://via.placeholder.com/150x50" // Replace with your company logo
              alt="Company Logo"
              className="img-fluid"
            />
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="row mb-4">
          <div className="col-md-4 text-center text-md-start">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
              <li><Link to="/pricing" className="text-white text-decoration-none">Pricing</Link></li>
              <li><Link to="/ContactUS" className="text-white text-decoration-none">Contact</Link></li>


            </ul>
          </div>
          <div className="col-md-4 text-center">
            <h6 className="mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li><Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link></li>
              <li><Link to="/support" className="text-white text-decoration-none">Support</Link></li>
              <li><Link to="/blog" className="text-white text-decoration-none">Blog</Link></li>
            </ul>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <h6 className="mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-end">
              <a href="https://www.facebook.com" className="text-white text-decoration-none mx-2" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com" className="text-white text-decoration-none mx-2" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com" className="text-white text-decoration-none mx-2" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com" className="text-white text-decoration-none mx-2" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Footer Text */}
        <div className="row border-top pt-3 mt-4">
          <div className="col text-center">
            <small>&copy; 2024 Your Company. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
