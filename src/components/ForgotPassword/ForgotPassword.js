import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // For navigation after success

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Basic validation for empty email
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Sending the request to backend for password reset
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/forgot-password`, { email });

      // Log the response data for debugging
      console.log(response);

      // Check for a successful response from the backend
      if (response.data.Status === "Success") {
        toast.success("Forgot Password Link Successfully Sent to your email account");
        navigate("/login"); // Redirecting to login page after success
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8 col-12">
            <div className="card shadow-lg">
              <div className="card-body">
                <h4 className="text-center mb-4">Forgot Password</h4>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <strong>Email</strong>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="off"
                      name="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Reset Link
                  </button>
                </form>
                <div className="text-center mt-3">
                  <a href="/login" className="text-decoration-none">
                    Back to Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
