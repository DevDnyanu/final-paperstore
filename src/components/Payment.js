import React, { useContext, useState } from "react";
import { multiStepContext } from "../StepContext.js";

const BillingForm = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!userData.fullName || userData.fullName.trim().length < 3)
      newErrors.fullName = "Full Name must be at least 3 characters long.";

    // Billing Address validation
    if (!userData.billingAddress || userData.billingAddress.split(/\s+/).length > 100)
      newErrors.billingAddress = "Billing Address must not exceed 100 words.";

    // Card Number validation
    if (!userData.cardNumber || !/^\d{16}$/.test(userData.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Card Number must be 16 digits.";

    // Expiry Date validation
    if (!userData.expiryDate || !/^\d{2}\/\d{2}$/.test(userData.expiryDate)) {
      newErrors.expiryDate = "Expiration Date must be in MM/YY format.";
    } else {
      const [month, year] = userData.expiryDate.split("/").map(Number);
      if (month < 1 || month > 12) {
        newErrors.expiryDate = "Expiration month (MM) must be between 01 and 12.";
      }
    }

    // CVV validation
    if (!userData.cvv || !/^\d{3}$/.test(userData.cvv))
      newErrors.cvv = "CVV must be 3 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(4); // Move to next step if the form is valid
    }
  };

  const formatCardNumber = (value) => {
    let formattedValue = value.replace(/\D/g, ""); // Remove all non-digits
    formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space after every 4 digits
    return formattedValue;
  };

  return (
    <div className="container mt-5 p-4 border rounded-lg shadow-lg">
      <h5 className="text-center text-primary mb-4">Billing Information</h5>
      <form>
        {/* Full Name */}
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={userData.fullName || ""}
            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
          />
          {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
        </div>

        {/* Billing Address */}
        <div className="mb-3">
          <label>Billing Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={userData.billingAddress || ""}
            onChange={(e) => {
              const value = e.target.value;
              const wordCount = value.trim().split(/\s+/).length;
              if (wordCount <= 100) {
                setUserData({ ...userData, billingAddress: value });
              }
            }}
            placeholder="Enter up to 100 words"
          ></textarea>
          {errors.billingAddress && <p className="text-danger">{errors.billingAddress}</p>}
        </div>

        {/* Card Number */}
        <div className="mb-3">
          <label>Card Number</label>
          <input
            type="text"
            className="form-control"
            value={userData.cardNumber || ""}
            onChange={(e) => {
              const formattedValue = formatCardNumber(e.target.value);
              setUserData({ ...userData, cardNumber: formattedValue });
            }}
            maxLength={19} // Allow spaces after every 4 digits
            placeholder="1234 2345 2345 2345"
          />
          {errors.cardNumber && <p className="text-danger">{errors.cardNumber}</p>}
        </div>

        <div className="row">
          {/* Expiration Date (MM/YY) */}
          <div className="col-md-6">
            <label>Expiration Date (MM/YY)</label>
            <input
              type="text"
              className="form-control"
              value={userData.expiryDate || ""}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                if (value.length > 2) {
                  value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                }
                setUserData({ ...userData, expiryDate: value });
              }}
              maxLength={5} // Prevent entering more than 5 characters
              placeholder="MM/YY"
            />
            {errors.expiryDate && <p className="text-danger">{errors.expiryDate}</p>}
          </div>

          {/* CVV */}
          <div className="col-md-6">
            <label>CVV</label>
            <input
              type="text"
              className="form-control"
              value={userData.cvv || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                if (value.length <= 3) {
                  setUserData({ ...userData, cvv: value });
                }
              }}
              maxLength={3} // Prevent entering more than 3 characters
              placeholder="CVV"
            />
            {errors.cvv && <p className="text-danger">{errors.cvv}</p>}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={() => setStep(2)}
            type="button"
            className="btn btn-secondary"
          >
            Back
          </button>
          <button onClick={handleNext} type="button" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
