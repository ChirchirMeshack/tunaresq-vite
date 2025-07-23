import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react"
import { useFundraiserTypeStore } from "stores/fundraiser-form"
import useAuthCtx from "@contexts/auth/use-auth"
import { LayoutContextType } from "@layouts/registration"
import { useOutletContext } from "react-router-dom"

interface BeneficiaryOption {
  value: string
  title: string
  description: string
  icon: LucideIcon
}

export function SelectBeneficiaryForm() {
	const {user} = useAuthCtx();
	const { fundraiserTypes, selectedFundraiserType, selectFundraiserType } = useFundraiserTypeStore();
	const { handleStepComplete, setCurrentStep } = useOutletContext<LayoutContextType>();

	const handleBack = () => {
		setCurrentStep('welcome');
	};

	const handleContinue = () => {
		if (user) {
			handleStepComplete('create-account');
		} else {
		handleStepComplete('select-beneficiary');
			
		}
	};

  return (<>
    <div className="bg-white rounded-lg shadow-sm p-8 border space-y-8 mt-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Who are you fundraising for?</h1>
        <p className="text-gray-600">Select the option that best describes your fundraiser.</p>
      </div>
        <div className="space-y-4">
          <section>
              <div className="space-y-4">
                {fundraiserTypes && fundraiserTypes.length > 0 && (fundraiserTypes.map((option) => {
                  const IconComponent = ArrowRight// option.icon || 
                  const isSelected = selectedFundraiserType?.id === option.id

                  return (
                    <div
                      key={option.id}
                      onClick={() => selectFundraiserType({ id: option.id, name: option.name })}
                      className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        isSelected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Radio Button */}
                          <div className="flex items-center mt-1">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? "border-green-500 bg-green-500" : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{option.name}</h3>
                            <p className="text-gray-600 text-sm">{option.description}</p>
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="ml-4">
                          <IconComponent className={`h-6 w-6 ${isSelected ? "text-green-600" : "text-gray-400"}`} />
                        </div>
                      </div>
                    </div>
                  )
                }))}
              </div>
          </section>

        </div>
    </div>
     <div className="w-full max-w-3xl sm:max-w-md md:max-w-3xl lg:max-w-3xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-4">
					<button
          type="button"
						onClick={handleBack}
						className="w-[120px] border md:w-[150px] rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						<ArrowLeft className="size-4 sm:size-5" />
						Back
					</button>
					<button
            type="button"
            onClick={handleContinue}
						className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						Continue
						<ArrowRight className="size-4 sm:size-5" />
					</button>
				</div>
    </>
  )
}

export type { BeneficiaryOption }
