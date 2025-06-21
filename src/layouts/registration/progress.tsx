import { Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { Step, defaultSteps } from "../../lib/progressUtils"

/**
 * Props for the ProgressSteps component
 */
interface ProgressStepsProps {
  steps?: Step[]           // Array of steps to display
  currentStep: string     // Current active step
  onStepComplete?: (stepId: string) => void  // Optional callback for step completion
}

/**
 * ProgressSteps Component
 * 
 * A visual progress tracker that displays steps in a registration or onboarding process.
 * Each step is represented by a circle with a number or checkmark, connected by lines.
 * Responsive design that adapts to different screen sizes.
 * 
 * @param steps - Array of steps to display (defaults to defaultSteps)
 * @param currentStep - Current active step
 * @param onStepComplete - Optional callback function when a step is completed
 */
export default function ProgressSteps({ steps = defaultSteps, currentStep }: ProgressStepsProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const currentStepDetails = steps[currentStepIndex]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 m-7">
      <div className="flex items-center justify-between overflow-x-auto pb-4 hide-scrollbar-mobile">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center w-full min-w-[60px] sm:min-w-[100px]">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  // Mobile styles
                  "bg-white",
                  step.completed ? "border-green-500 text-green-500" :
                  step.id === currentStep ? "border-green-500" :
                  "border-gray-300",

                  // Desktop overrides
                  step.completed || step.id === currentStep
                    ? "sm:bg-green-700 sm:border-green-700 sm:text-white"
                    : "sm:bg-white sm:border-gray-300 sm:text-gray-500",
                )}
              >
                {step.completed ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-1 sm:mt-2 text-center hidden sm:block">
                <div
                  className={cn(
                    "text-xs sm:text-sm font-inter transition-colors",
                    step.completed || step.id === currentStep ? "text-green-600" : "text-gray-500",
                    step.completed || step.id === currentStep ? "font-bold" : "font-medium",
                  )}
                >
                  {step.title.split(" ").map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 mx-2 sm:mx-4 transition-colors",
                  step.completed ? "bg-green-500" : "bg-gray-300"
                )}
                style={{ minWidth: 20, flex: 1 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="sm:hidden text-center mb-4">
        <p className="text-sm font-medium text-gray-700">
          Step {currentStepIndex + 1} of {steps.length}: {currentStepDetails?.title}
        </p>
      </div>
    </div>
  )
}
