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
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 m-7">
      <div className="flex items-center justify-between overflow-x-auto pb-4 hide-scrollbar-mobile">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center w-full min-w-[80px] sm:min-w-[100px]">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  step.completed || step.id === currentStep
                    ? "bg-green-700 border-green-700 text-white"
                    : "bg-white border-gray-300 text-gray-500",
                )}
              >
                {step.completed ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-1 sm:mt-2 text-center">
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
    </div>
  )
}
