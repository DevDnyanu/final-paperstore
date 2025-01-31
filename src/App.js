import React, { useContext } from 'react';
import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import DocumentList from './components/DocumentList.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Login from './components/Login/Login.js'; 
import SignUp from './components/Signup/Signup.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';
import ContactUS from './components/ContactUS/ContactUS.js';
import ResetPassword from './components/ResetPassword/ResetPassword.js'; // Corrected import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Stepper, Step, StepLabel } from '@mui/material';
import UploadForm from './components/UploadForm.js';
import DocumentInfo from './components/DocumentInfo.js';
import { multiStepContext } from './StepContext.js';
import Payment from './components/Payment.js';
import Confirmation from './components/Confirmation.js';

function App() {
  const { currentStep } = useContext(multiStepContext);
  const location = useLocation();

  function showStep(step) {
    switch (step) {
      case 1:
        return <UploadForm />;
      case 2:
        return <DocumentInfo />;
      case 3:
        return <Payment />;
      case 4:
        return <Confirmation />;
      default:
        return null;
    }
  }

  const excludedPages = [
    '/login',
    '/signup',
    '/otp',
    '/Otp',
    '/forgot-password',
    '/forgot',
    '/ContactUS', // Ensure this matches exactly
    '/xyz'
  ];
 

  return (
    <>
      {/* Render Header if not on excluded pages */}
      {excludedPages.indexOf(location.pathname) === -1 && <Header />} 

      {/* Stepper content if not on excluded pages */}
      {location.pathname !== '/xyz' && excludedPages.indexOf(location.pathname) === -1 && ( 
        <div className="container mt-5 p-4 border rounded shadow-sm" style={{ borderColor: '#ddd', borderWidth: '1px', backgroundColor: '#fff' }}>
          <Stepper style={{ width: '60%', margin: '0 auto' }} activeStep={currentStep - 1} orientation="horizontal">
            <Step>
              <StepLabel>File Upload</StepLabel>
            </Step>
            <Step>
              <StepLabel>Disclosure Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Billing Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Publication Confirmation</StepLabel>
            </Step>
          </Stepper>
          <div className="stepper-content mt-4">
            {showStep(currentStep)}
          </div>
        </div>
      )}

      {/* Routes for different pages */}
      <Routes>
        <Route path="/xyz" element={<DocumentList />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/ContactUS" element={<ContactUS />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
       
      </Routes>

      {/* Render Footer if not on excluded pages */}
      {excludedPages.indexOf(location.pathname) === -1 && <Footer />} 
    </>
  );
}

export default App;
