import React, { useState, useContext } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { multiStepContext } from "../StepContext.js";

const FileUploadForm = () => {
  const { setStep, userData = {}, setUserData } = useContext(multiStepContext);

  // Local state to store the uploaded file info
  const [fileInfo, setFileInfo] = useState(userData.fileInfo || null);
  const [file, setFile] = useState(null); // Local file state
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the file is either PDF or Word document
    if (selectedFile) {
      const validExtensions = ["pdf", "docx"];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        setErrorMessage("Only PDF and Word files are allowed.");
        return;
      }

      const fileDetails = {
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(1), // File size in KB
      };
      // Update state with file details
      setUserData({ ...userData, file: selectedFile, fileInfo: fileDetails });
      setFile(selectedFile); // Save selected file in local state
      setFileInfo(fileDetails);
      setErrorMessage(""); // Reset any previous error
    }
  };

  // Handle file upload (currently only simulating upload)
  const handleFileUpload = async () => {
    // Validate that a file has been uploaded
    if (!file) {
      setErrorMessage("Please upload a valid file before proceeding.");
      return;
    }
    

    setUploading(true);
    // Simulate file upload (you can replace this with actual upload logic)
    setTimeout(() => {
      setUploading(false); // Stop uploading
      setStep(2); // Move to next step
    }, 2000); // Simulate 2 seconds upload time
  };

  return (
    <div className="container mt-5">
      {/* Step Indicator */}
      <div className="d-flex justify-content-center mb-4">
        <ol className="step-indicator list-inline text-center">
          {/* Add step indicator if needed */}
        </ol>
      </div>

      {/* File Upload Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h5 className="fw-bold mb-3 text-primary">
            <span>1 </span>FILE UPLOAD
          </h5>
          <p className="text-muted mb-4">
            Prepare your submission file(s) on A4 or US letter size paper, with
            margins of at least 2.5cm (1 inch), font size 12 points or larger
            and save in Microsoft Word or as a PDF.
          </p>

          {/* Drag and Drop Area */}
          <div
            className="border border-2 border-dashed rounded text-center p-4"
            style={{ backgroundColor: fileInfo ? "#e9f5ff" : "white" }}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control visually-hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <FaCloudUploadAlt className="text-primary fs-1 mb-2" />
              {!fileInfo ? (
                <>
                  <p className="fw-bold mb-1">Drag and drop a file here</p>
                  <small className="text-muted">Or browse to choose a file</small>
                  <br />
                  <small className="text-muted">(Microsoft Word or PDF)</small>
                </>
              ) : (
                <div className="text-primary mt-3">
                  <p className="mb-1">{fileInfo.name}</p>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                      setUserData({ ...userData, file: null, fileInfo: null });
                      setFileInfo(null);
                      setFile(null); // Reset the file state
                    }}
                  >
                    Update File
                  </button>
                </div>
              )}
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Upload Button */}
          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={handleFileUpload}
              className="btn btn-primary fw-bold px-4"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;
