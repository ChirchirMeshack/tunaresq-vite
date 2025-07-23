import { Button } from "@components/ui/button"
import { LayoutContextType } from "@layouts/registration"
import { useOutletContext } from "react-router-dom"


export default function WelcomeCard() {
	const { handleStepComplete } = useOutletContext<LayoutContextType>();

  
  const handleCreateFundraiser = () => {
    handleStepComplete('welcome'); // First complete the welcome step
  };

  const handleSkipToSignUp = () => {
    handleStepComplete('welcome'); // Complete welcome
    handleStepComplete('select-beneficiary'); // Immediately complete select-beneficiary
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border space-y-8 mt-8">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to TunaresQ</h1>

        <div className="space-y-4 text-gray-600 max-w-2xl mx-auto">
          <p>Welcome to TunaresQ! We're excited to help you raise funds for your cause or your startup.</p>
          <p>
            TunaresQ makes it easy to create and share your fundraiser with friends, family, and your community. Let's
            get started with a few simple steps to set up your fundraiser.
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 max-w-md mx-auto">
        <Button
          onClick={handleCreateFundraiser}
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md"
        >
          Let's create your fundraiser
        </Button>

        <Button
          onClick={handleSkipToSignUp}
          variant="outline"
          className="w-full h-12 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-md"
        >
          Or sign up to support other fundraisers
        </Button>
    </div></div>
  )
}
