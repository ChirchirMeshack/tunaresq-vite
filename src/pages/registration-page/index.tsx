import { useOutletContext } from 'react-router-dom'
import FundraiserTypePage from '@components/workflows/fundraiserType-page';
import SignupForm from '@components/workflows/Signup-page';
import WelcomeCard from '@components/WelcomeCard';
import FundraiserDetailsPage from '@components/workflows/FundraiserForms';
import PaymentDetails from '@components/workflows/PaymentDetails';
import { LayoutContextType } from '@layouts/registration';
import FundraiserLaunchProgress from '@components/workflows/FundraiserPreview';

function RegistrationPage() {
  const { currentStep, handleStepComplete, handleBackStep, onboardingComplete } = useOutletContext<LayoutContextType>();

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
        return <FundraiserDetailsPage />;
      case 'payment-details':
        return <PaymentDetails onBack={() => handleBackStep('fundraiser-details')} onContinue={() => handleStepComplete('payment-details')}/>;
      case 'launch-fundraiser':
        return <FundraiserLaunchProgress onStepComplete={onboardingComplete} />;
      default:
        return (
          <WelcomeCard
            onCreateFundraiser={handleCreateFundraiser}
            skipToSignUp={handleSkipToSignUp}
          />
        );
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