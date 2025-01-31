import React, { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import UploadForm from '../UploadForm';
import DocumentList from '../DocumentList';
import DocumentInfo from '../DocumentInfo';

const StepperWithForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'File upload' },
    { title: 'Disclosure details' },
    { title: 'Billing details' },
    { title: 'Publication confirmation' },
    { title: '' },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0: return <UploadForm />;
      case 1: return <DocumentInfo />;
      case 2: return <DocumentList />;
      case 3: return <DocumentList />;
      case 4: return <UploadForm />;
      default: return null;
    }
  }

  return (
    <div className="flex flex-col items-center mt-2 border rounded-lg shadow-md w-500 h-auto pb-4">

      {/* Stepper container with increased width */}
      <div className="w-full max-w-5xl  pb-2">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          activeColor="#3498db"
          completeColor="black"
          completeTitleColor="black"
          activeTitleColor="#3498db"
          size={25}
          barStyle="solid"
          titleFontSize={15}
          titleStyle={{ fontWeight: '900', fontSize: '16px' }}
        />
      </div>

     
      <div className="relative w-full p-5 ">
        {/* Conditionally render the component based on the activeStep */}
        {getSectionComponent()}

        {/* Navigation buttons positioned below the active component */}
        <div className="flex justify-between mt-6">
          {activeStep !== 0 && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Previous
            </button>
          )}
          {activeStep !== steps.length - 1 && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Next 
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperWithForm;
