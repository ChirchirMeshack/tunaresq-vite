/**
 * @interface Step
 * @description Defines the structure for a single step in a progress tracker.
 * @property {string} id - A unique, lowercase identifier for the step.
 * @property {string} title - The human-friendly display title of the step.
 * @property {boolean} completed - Whether the step is complete.
 */
export interface Step {
  id: string;
  no: number;
  title: string;
  completed: boolean;
}

/**
 * @interface CurrentStepProps
 * @description Tracks the current step using the `id` field (string).
 */
export interface CurrentStepProps {
  currentStep: string;
  onStepComplete?: (stepId: string) => void;
}

/**
 * @function handleStepComplete
 * @description Marks a step as completed and optionally moves to the next one.
 * @param {string} currentStepId - The id of the step to mark as complete.
 * @param {Step[]} steps - All step objects.
 * @param {(stepId: string) => void} [onStepComplete] - Callback fired with the next step id.
 * @returns {Step[]} Updated steps.
 */
export function handleStepComplete(
  currentStepId: string,
  steps: Step[],
  onStepComplete?: (stepId: string) => void
): Step[] {
  // First, mark the current step as completed
  const updatedSteps = steps.map((step) => ({
    ...step,
    completed: step.id === currentStepId ? true : step.completed,
  }));

  // Find the current step object
  const currentStep = steps.find((step) => step.id === currentStepId);
  
  // If we have a current step, find the next step by its number
  if (currentStep) {
    const nextStep = steps.find((step) => step.no === currentStep.no + 1);
    if (nextStep && onStepComplete) {
      onStepComplete(nextStep.id);
    }
  }

  return updatedSteps;
}

/**
 * @constant defaultSteps
 * @description The default sequence of registration steps.
 */
export const defaultSteps: Step[] = [
  {
    id: "welcome",
    no: 1,
    title: "Welcome",
    completed: true,
  },
  {
    id: "select-beneficiary",
    no: 2,
    title: "Select Beneficiary",
    completed: false,
  },
  {
    id: "create-account",
    no: 3,
    title: "Create Account",
    completed: false,
  },
  {
    id: "fundraiser-details",
    no: 4,
    title: "Fundraiser Details",
    completed: false,
  },
  {
    id: "payment-details",
    no: 5,
    title: "Payment Details",
    completed: false,
  },
  {
    id: "launch-fundraiser",
    no: 6,
    title: "Launch Fundraiser",
    completed: false,
  },
];
