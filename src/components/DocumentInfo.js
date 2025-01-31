import React, { useContext, useState } from "react";
import { multiStepContext } from "../StepContext";

const DocumentInfo = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate User Name (only alphabetic characters allowed, min length: 3)
    if (!userData.username || userData.username.trim().length < 3) {
      newErrors.username = "User Name must be at least 3 characters long.";
    } else if (!/^[A-Za-z\s]+$/.test(userData.username)) {
      newErrors.username = "User Name can only contain alphabetic characters and spaces.";
    }

    // Validate Tracking Number (required and numeric)
    if (!userData.number || userData.number.trim().length === 0) {
      newErrors.number = "Tracking Number is required.";
    } else if (!/^\d+$/.test(userData.number)) {
      newErrors.number = "Tracking Number must contain only numbers.";
    }

    // Validate Language Selection
    if (!userData.language || userData.language.trim() === "") {
      newErrors.language = "Please select a language.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(3); // Proceed to the next step
    }
  };

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear field-specific error on input change
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0 text-center">Disclosure Details</h5>
            </div>
            <div className="card-body p-4">
              <form>
                {/* User Name */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={userData.username || ""}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter your name"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* Tracking Number */}
                <div className="mb-3">
                  <label htmlFor="trackingNumber" className="form-label">
                    Tracking Number:
                  </label>
                  <input
                    type="text"
                    id="trackingNumber"
                    value={userData.number || ""}
                    onChange={(e) => handleInputChange("number", e.target.value)}
                    placeholder="Enter tracking number"
                    className={`form-control ${errors.number ? "is-invalid" : ""}`}
                  />
                  {errors.number && (
                    <div className="invalid-feedback">{errors.number}</div>
                  )}
                </div>

                {/* Select Language */}
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    Select Language:
                  </label>
                  <select
                    id="language"
                    value={userData.language || ""}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                    className={`form-select ${errors.language ? "is-invalid" : ""}`}
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Russian">Russian</option>
                  </select>
                  {errors.language && (
                    <div className="invalid-feedback">{errors.language}</div>
                  )}
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => setStep(1)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    type="button"
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentInfo;
