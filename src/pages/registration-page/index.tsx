import { useOutletContext } from 'react-router-dom'
import FundraiserTypePage from '@components/workflows/fundraiserType-page';
import SignupForm from '@components/workflows/Signup-page';
import WelcomeCard from '@components/WelcomeCard';

import { Step } from '@lib/progressUtils';

type LayoutContextType = {
  steps: Step[];
  currentStep: string;
  handleStepComplete: (stepId: string) => void;
};

function RegistrationPage() {
  const { currentStep, handleStepComplete } = useOutletContext<LayoutContextType>();

  const handleCreateFundraiser = () => {
    handleStepComplete('welcome'); // First complete the welcome step
  };

  const handleSkipToSignUp = () => {
    handleStepComplete('welcome'); // Complete welcome
    handleStepComplete('select-beneficiary'); // Immediately complete select-beneficiary
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <WelcomeCard
            onCreateFundraiser={handleCreateFundraiser}
            skipToSignUp={handleSkipToSignUp}
          />
        );
      case 'select-beneficiary':
        return <FundraiserTypePage />;
      case 'create-account':
        return <SignupForm />;
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
    <div className="flex flex-col">
      {/* <div className="w-full max-w-4xl mx-auto px-4 py-6">
      </div> */}
      <main className=" flex items-center justify-center p-4 sm:p-6">
        {renderCurrentStep()}
      </main>
    </div>
  );
}

export default RegistrationPage;