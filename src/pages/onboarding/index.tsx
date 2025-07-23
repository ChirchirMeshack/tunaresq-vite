import { SelectBeneficiaryForm } from "./components/select-beneficiary-form"
import WelcomeCard from "@components/welcome-card"
import { LayoutContextType } from "@layouts/registration"
import { useOutletContext } from "react-router-dom"
import RegistrationForm from "./components/registration-form"
import FundraiserDetailsPage from "@components/onboarding/fundraiser-details"
import PaymentDetails from "@components/workflows/PaymentDetails"
import FundraiserLaunchProgress from "@components/workflows/FundraiserPreview"

export default function OnboardingFlow() {
  const { currentStep, handleStepComplete, handleBackStep, onboardingComplete } = useOutletContext<LayoutContextType>();


  // const handleWelcomeCreateFundraiser = () => {
  //   console.log("Starting fundraiser creation flow...")
  //   setShowWelcome(false)
  //   setShowSelectBeneficiary(true)
  // }

  // const handleWelcomeSupportOthers = () => {
  //   console.log("Going to create account for supporting others...")
  //   setShowWelcome(false)
  //   // Skip select beneficiary and go directly to account creation
  // }

  // const handleSelectBeneficiaryBack = () => {
  //   setShowSelectBeneficiary(false)
  //   setShowWelcome(true)
  // }

  // const handleSelectBeneficiaryContinue = (data: any) => {
  //   console.log("Beneficiary selection completed:", data)
  //   setShowSelectBeneficiary(false)
  //   // Show account creation form next
  // }

  // const onSubmitAccountCreation = (data: any) => {
  //   console.log("Account creation submitted:", data)
  //   setShowVerification(true)
  // }

  // const handleVerificationBack = () => {
  //   setShowVerification(false)
  // }

  // const handleVerificationSubmit = (code: string) => {
  //   console.log("Verification code submitted:", code)
  //   setShowVerification(false)
  //   setShowVerificationComplete(true)
  // }

  // const handleVerificationComplete = () => {
  //   console.log("Continuing to fundraiser details...")
  //   setShowVerificationComplete(false)
  //   setShowFundraiserDetails(true)
  // }

  // const handleFundraiserDetailsBack = () => {
  //   setShowFundraiserDetails(false)
  //   setShowVerificationComplete(true)
  // }

  // const handleFundraiserDetailsContinue = (data: any) => {
  //   console.log("Fundraiser details completed:", data)
  //   setShowFundraiserDetails(false)
  //   setShowStartupDetails(true)
  // }

  // const handleStartupDetailsBack = () => {
  //   setShowStartupDetails(false)
  //   setShowFundraiserDetails(true)
  // }

  // const handleStartupDetailsContinue = (data: any) => {
  //   console.log("Startup details completed:", data)
  //   // Here you would typically navigate to the next step (Payment Details)
  // }

  // Determine which view to show
  // const renderCurrentView = () => {
  //   if (showWelcome) {
  //     return <Welcome onCreateFundraiser={handleWelcomeCreateFundraiser} onSupportOthers={handleWelcomeSupportOthers} />
  //   }

  //   if (showSelectBeneficiary) {
  //     return (
  //       <SelectBeneficiaryForm
  //         options={beneficiaryOptions}
  //         defaultValue="yourself"
  //         onBack={handleSelectBeneficiaryBack}
  //         onContinue={handleSelectBeneficiaryContinue}
  //       />
  //     )
  //   }

  //   if (showStartupDetails) {
  //     return <StartupDetailsForm onBack={handleStartupDetailsBack} onContinue={handleStartupDetailsContinue} />
  //   }

  //   if (showVerificationComplete) {
  //     return <VerificationComplete onContinue={handleVerificationComplete} />
  //   }

  //   if (showVerification) {
  //     return <VerificationForm onBack={handleVerificationBack} onVerify={handleVerificationSubmit} />
  //   }

  //   if (showFundraiserDetails) {
  //     return <FundraiserDetailsForm onBack={handleFundraiserDetailsBack} onContinue={handleFundraiserDetailsContinue} />
  //   }

  //   // Default: Account creation form
  //   return (
  //     <Registration onBack={handleSkipToSignUp} onSubmit={onSubmitAccountCreation}/>
  //   )
  // }
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <WelcomeCard />
        );
      case 'select-beneficiary':
        return (
        <SelectBeneficiaryForm />
      )
      case 'create-account':
        return <RegistrationForm />;
      case 'fundraiser-details':
        return <FundraiserDetailsPage />;
      case 'payment-details':
        return <PaymentDetails onBack={() => handleBackStep('fundraiser-details')} onContinue={() => handleStepComplete('payment-details')} className="bg-white rounded-lg shadow-sm p-8 border mt-8 "/>;
      case 'launch-fundraiser':
        return <FundraiserLaunchProgress onStepComplete={onboardingComplete} />;
      default:
        return (
          <WelcomeCard />
        );
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
