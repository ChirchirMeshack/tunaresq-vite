import { SelectBeneficiaryForm } from "../../components/onboarding-forms/select-beneficiary-form"
import WelcomeCard from "@components/welcome-card"
import { LayoutContextType } from "@layouts/registration"
import { useOutletContext } from "react-router-dom"
import RegistrationForm from "../../components/onboarding-forms/registration-form"
import FundraiserDetailsPage from "@pages/onboarding/fundraiser-details"
import PaymentDetails from "@pages/onboarding/payment-details"
import FundraiserLaunchProgress from "@components/onboarding-animation"

export default function OnboardingFlow() {
  const { currentStep, handleStepComplete, handleBackStep, onboardingComplete } = useOutletContext<LayoutContextType>();
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeCard />;
      case 'select-beneficiary':
        return <SelectBeneficiaryForm />;
      case 'create-account':
        return <RegistrationForm />;
      case 'fundraiser-details':
        return <FundraiserDetailsPage />;
      case 'payment-details':
        return <PaymentDetails onBack={() => handleBackStep('fundraiser-details')} onContinue={() => handleStepComplete('payment-details')} className="bg-white rounded-lg shadow-sm p-8 border mt-8 "/>;
      case 'launch-fundraiser':
        return <FundraiserLaunchProgress onStepComplete={onboardingComplete} />;
      default:
        return <WelcomeCard />;
    }
  };

  return (
    <>

      {/* Form Content */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-8">
        {renderCurrentStep()}
      </div>
    </>
  )
}
