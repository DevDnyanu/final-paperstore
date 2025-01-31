import React, { useState, createContext } from 'react';

export const multiStepContext = createContext();


const StepContext = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    
    setFinalData((prevFinalData) => [...prevFinalData, userData]);
console.log("finalData",finalData);    // Clear userData after submission
    setUserData([]);
    
  }

  return (
    <multiStepContext.Provider value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData }}>
      {children}
    </multiStepContext.Provider>
  );
};

export default StepContext;
