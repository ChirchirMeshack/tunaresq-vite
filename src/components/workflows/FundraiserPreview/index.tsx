import { useState, useEffect, useCallback } from "react"
import { Check, Loader2 } from "lucide-react"
import { Card, CardContent } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { cn } from "@lib/utils"
import rocket from 'assets/rocket.png';


interface FundraiserLaunchProgressProps {
  onStepComplete?: boolean
}

interface Step {
  id: string
  label: string
  status: "completed" | "in-progress" | "pending"
}

const initialSteps: Step[] = [
  { id: "creating", label: "Creating your fundraiser", status: "completed" },
  { id: "verifying", label: "Verifying your information", status: "completed" },
  { id: "payment", label: "Setting up your payment details", status: "completed" },
  { id: "publishing", label: "Publishing to TunaresQ", status: "in-progress" },
  { id: "live", label: "Your fundraiser is live!", status: "pending" },
]


export default function FundraiserLaunchProgress({
  onStepComplete = false,
}: FundraiserLaunchProgressProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [progress, setProgress] = useState(20)

  // Calculate progress based on completed steps
  const calculateProgress = useCallback((currentSteps: Step[]) => {
    const completedSteps = currentSteps.filter((step) => step.status === "completed").length
    const inProgressSteps = currentSteps.filter((step) => step.status === "in-progress").length

    // Each step is worth 20% (100% / 5 steps)
    let calculatedProgress = completedSteps * 20

    // Add partial progress for in-progress step
    if (inProgressSteps > 0) {
      calculatedProgress += 10 // Add 10% for in-progress step
    }

    return Math.min(calculatedProgress, 100)
  }, [])
  
  // Complete the current in-progress step
  const completeCurrentStep = useCallback(() => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps]
      const currentStepIndex = newSteps.findIndex((step) => step.status === "in-progress")

      if (currentStepIndex !== -1) {
        // Mark current step as completed
        newSteps[currentStepIndex].status = "completed"

        // Move to next step if available
        const nextStepIndex = currentStepIndex + 1
        if (nextStepIndex < newSteps.length) {
          newSteps[nextStepIndex].status = "in-progress"
        }

        // Calculate new progress
        const newProgress = calculateProgress(newSteps)
        setProgress(newProgress)

        // // Call callback
        // onStepComplete?.(newSteps[currentStepIndex].id, currentStepIndex)

        // // Check if all steps are complete
        // if (newSteps.every((step) => step.status === "completed")) {
        //   onAllStepsComplete?.()
        // }
      }

      return newSteps
    })
  }, [calculateProgress])

  // Simulate progress updates
  useEffect(() => {
    if (progress >= 80) return
    const timer = setTimeout(() => {
        setProgress(progress + 20)
        // completeCurrentStep()
    }, 1000)
    return () => clearTimeout(timer)
  }, [progress])

  // When onStepComplete is provided, simulate progress updates
  useEffect(() => {
    if (onStepComplete) {
      completeCurrentStep()
      // navigate to next page 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onStepComplete])

  
  // Reset progress to initial state
  const resetProgress = useCallback(() => {
    setSteps(initialSteps)
    setProgress(20)
  }, [])


  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl ">
        <CardContent className="p-12 text-center space-y-8">
          {/* Rocket Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <img src={rocket} className="w-16 h-16" />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">Launching your fundraiser</h1>
            <p className="text-gray-500 text-lg">Please wait while we set up everything</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto">
            <Progress value={progress} className="h-3 bg-gray-200" />
          </div>

          {/* Steps List */}
          <div className="space-y-4 text-left max-w-md mx-auto">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {step.status === "completed" && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {step.status === "in-progress" && (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-gray-900 animate-spin" />
                    </div>
                  )}
                  {step.status === "pending" && <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />}
                </div>
                <span
                  className={cn(
                    "text-base",
                    step.status === "completed" && "text-green-600 font-medium",
                    step.status === "in-progress" && "text-gray-900 font-medium",
                    step.status === "pending" && "text-gray-400",
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Debug Controls (remove in production) */}
          <div className="flex gap-2 justify-center pt-4 border-t border-gray-200">
            <button
              onClick={resetProgress}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              Reset
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
