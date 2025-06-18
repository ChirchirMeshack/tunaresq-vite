import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'
import FundraiserTypePage from '@components/workflows/fundraiserType-page';
import WelcomeDialog from '@components/WelcomeDialog';
import { Step } from '@lib/progressUtils';

type LayoutContextType = {
  steps: Step[];
  currentStep: string;
  handleStepComplete: (stepId: string) => void;
};

function RegistrationPage() {
  const { currentStep, handleStepComplete } = useOutletContext<LayoutContextType>();
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  // Update welcome dialog visibility based on current step
  useEffect(() => {
    setShowWelcomeDialog(currentStep === 'welcome');
  }, [currentStep]);

  const handleCreateFundraiser = () => {
    setShowWelcomeDialog(false);
    handleStepComplete('welcome'); // First complete the welcome step
  };

  const handleSkipToSignUp = () => {
    setShowWelcomeDialog(false);
    handleStepComplete('welcome'); // First complete the welcome step
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return null; // Welcome step is handled by the dialog
      case 'select-beneficiary':
        return <FundraiserTypePage />;
      case 'create-account':
        return <p>Signup Component</p>;
      case 'fundraiser-details':
        return <p>Fundraiser Details Component</p>;
      case 'payment-details':
        return <p>Payment Details Component</p>;
      case 'launch-fundraiser':
        return <p>Launch Fundraiser Component</p>;
      default:
        return <div>Unknown step: {currentStep}</div>;
    }
  };

  return (
    <>
      <WelcomeDialog
        onCreateFundraiser={handleCreateFundraiser}
        skipToSignUp={handleSkipToSignUp}
        isOpen={showWelcomeDialog}
        handleClose={() => setShowWelcomeDialog(false)}
      />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
        </div>
        <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
          {renderCurrentStep()}
        </main>
      </div>
    </>
  );
}

export default RegistrationPage;