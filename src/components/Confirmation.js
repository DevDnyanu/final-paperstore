import React, { useContext } from "react";
import { multiStepContext } from "../StepContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastNotification from './ToastNotification.js';
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Confirmation = () => {
  const { setStep, userData, submitData } = useContext(multiStepContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("userdata", userData);  // Check userData in console
  
    try {
      // Create a new FormData object to send form data along with the file
      const formData = new FormData();
      formData.append("file", userData.file);  // Attach the file to the FormData
      formData.append("name", userData.fullName);
      formData.append("username", userData.username);
      formData.append("number", userData.number);
      formData.append("language", userData.language);
      formData.append("billingAddress", userData.billingAddress);
      formData.append("cardNumber", userData.cardNumber);
      formData.append("expiryDate", userData.expiryDate);
  
      // Send the FormData to the backend API
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Set the correct header for file upload
        },
      });
  
      if (response.status === 200) {
        toast.success("Data submitted successfully!");
        submitData();  // Add the data to finalData and clear userData
        // navigate("/xyz");  // Navigate to a success page or other route
      } else {
        toast.error("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while submitting data.");
    }
  };
  
  return (
    <>
      <ToastNotification />
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header text-center text-primary">
            <h6 className="font-weight-bold mb-4">Confirmation</h6>
          </div>
          <div className="card-body">
            {/* <div className="mb-4">
              <h6 className="text-primary font-weight-bold">Documents Details</h6>
              <p>
                <strong>Document Name:</strong> {userData.name || "Not provided"}
              </p>
            </div> */}

            <div className="mb-4">
              <h6 className="text-primary font-weight-bold">Address Details</h6>
              <p>
                <strong>User Name:</strong> {userData.username || "Not provided"}
              </p>
              <p>
                <strong>Tracking Number:</strong> {userData.number || "Not provided"}
              </p>
              <p>
                <strong>Language:</strong> {userData.language || "Not provided"}
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-primary font-weight-bold">Payment Information</h6>
              <p>
                <strong>Billing Address:</strong> {userData.billingAddress || "Not provided"}
              </p>
              <p>
                <strong>Card Number:</strong> {userData.cardNumber ? `**** **** **** ${userData.cardNumber.slice(-4)}` : "Not provided"}
              </p>
              <p>
                <strong>Expiration Date:</strong> {userData.expiryDate || "Not provided"}
              </p>
            </div>

            <div className="d-flex justify-content-end">
              <button
                onClick={() => setStep(3)}
                type="button"
                className="btn btn-danger me-2"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
