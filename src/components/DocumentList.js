import React, { useEffect, useState, useContext } from "react";
import { multiStepContext } from "../StepContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ToastNotification from "./ToastNotification";
import Header from "./Header/Header"; // Import the Header component
import Footer from "./Footer/Footer"; // Import the Footer component

const DocumentList = () => {
  const [documentData, setDocumentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const { setStep } = useContext(multiStepContext);
  const navigate = useNavigate();

  const [openDocument, setOpenDocument] = useState(null);

  useEffect(() => {
    // Fetch documents on component mount
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/files`)
      .then((res) => {
        setDocumentData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching documents:", err);
      });
  }, []);

  // Handle document deletion
  const handleDelete = (documentId) => {
    console.log('Deleting document with ID:', documentId);  // Log documentId
    if (window.confirm("Are you sure you want to delete this document?")) {
      axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/api/files/${documentId}`)
        .then((response) => {
          console.log('Delete response:', response);  // Log the full response
          if (response.status === 200) {
            toast.success("Document and file deleted successfully");
            setDocumentData(documentData.filter((doc) => doc._id !== documentId)); // Update the state
          } else {
            toast.error("Failed to delete document");
          }
        })
        .catch((err) => {
          console.error("Error deleting document:", err.response || err);
          toast.error("Failed to delete document");
        });
    }
  };

  // Handle document edit
  const handleEdit = (documentId) => {
    navigate(`/edit-document/${documentId}`);
  };

  const handleUploadClick = () => {
    setStep(1);
    navigate("/upload-document");
  };

  const toggleDocumentDetails = (id) => {
    setOpenDocument(openDocument === id ? null : id);
  };

  // Pagination Logic
  const totalPages = Math.ceil(documentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header /> {/* Include the Header specifically for this page */}
      <ToastNotification />
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Document Data</h2>
          <button
            onClick={handleUploadClick}
            className="btn btn-primary shadow-sm"
          >
            Upload Document
          </button>
        </div>

        {!openDocument && (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>User Name</th>
                    <th>Tracking Number</th>
                    <th>Billing Address</th>
                    <th>Language</th>
                    <th>Card Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product) => (
                    <tr key={product._id}>
                      <td>{product.username || "N/A"}</td>
                      <td>{product.number || "N/A"}</td>
                      <td>{product.billingAddress || "N/A"}</td>
                      <td>{product.language || "N/A"}</td>
                      <td>{product.cardNumber || "N/A"}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => handleEdit(product._id)}
                            className="btn btn-success btn-sm mx-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-danger btn-sm mx-1"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toggleDocumentDetails(product._id)}
                            className="btn btn-primary btn-sm mx-1"
                          >
                            {openDocument === product._id
                              ? "View Less"
                              : "View More"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-center mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`btn btn-outline-primary mx-1 ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {openDocument && (
          <div className="p-3 border mt-3">
            <button
              onClick={() => setOpenDocument(null)}
              className="btn btn-secondary btn-sm mb-3"
            >
              Back to Table
            </button>
            {documentData
              .filter((product) => product._id === openDocument)
              .map((product) => (
                <div key={product._id}>
                  <p>
                    <strong>User Name:</strong> {product.username || "N/A"}
                  </p>
                  <p>
                    <strong>Tracking Number:</strong> {product.number || "N/A"}
                  </p>
                  <p>
                    <strong>Billing Address:</strong>{" "}
                    {product.billingAddress || "N/A"}
                  </p>
                  <p>
                    <strong>Language:</strong> {product.language || "N/A"}
                  </p>
                  <p>
                    <strong>Card Number:</strong> {product.cardNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Document Name:</strong> {product.name || "N/A"}
                  </p>
                  <p>
                    <strong>Expiry Date:</strong> {product.expiryDate || "N/A"}
                  </p>
                  <p>
                    <strong>File Info:</strong>{" "}
                    {product.fileInfo ? product.fileInfo.name : "No file info"}
                  </p>
                  <a
                    href={`${process.env.REACT_APP_BASE_URL}${product.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary btn-sm">
                      Open File
                    </button>
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DocumentList;
