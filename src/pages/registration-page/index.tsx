import { useState } from 'react';
import {useOutletContext} from 'react-router-dom'
import FundraiserTypePage from '@components/workflows/fundraiserType-page';
import WelcomeDialog from '@components/WelcomeDialog';

type LayoutContextType = {
  steps: any[];
  currentStep: string;
  handleStepComplete: (stepId: string) => void;
};
function RegistrationPage() {
  const [showFundraiserType, setShowFundraiserType] = useState(true);
  const { currentStep, handleStepComplete } = useOutletContext<LayoutContextType>();

  console.log('RegistrationPage currentStep:', currentStep);
  console.log('RegistrationPage handleStepComplete:', handleStepComplete);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'create-account':
        return <p>Signup Component</p>
      case 'select-beneficiary':
        return <FundraiserTypePage />
      default:
        return <div>{currentStep}</div>
    }
  }

  return (
    <>
    <WelcomeDialog
    onCreateFundraiser={() => {
      setShowFundraiserType(false)
      handleStepComplete('select-beneficiary')
    }}
    skipToSignUp={() => {
      setShowFundraiserType(false)
      handleStepComplete('create-account')
    }}
    isOpen={showFundraiserType} handleClose={() => setShowFundraiserType(false)} />
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
      </div>
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        {renderCurrentStep()}
      </main>
    </div></>
  );
}

export default RegistrationPage;