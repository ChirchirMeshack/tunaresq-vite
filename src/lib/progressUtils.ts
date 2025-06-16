/**
 * @interface Step
 * @description Defines the structure for a single step in a progress tracker.
 * @property {number} id - A unique identifier for the step.
 * @property {string} title - The title or name of the step, displayed in the progress tracker.
 * @property {boolean} completed - Indicates whether the step has been completed. True if completed, false otherwise.
 */
export interface Step {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * @function handleStepComplete
 * @description Updates the completion status of a specific step in a progress array and optionally triggers a callback for the next step.
 * @param {number} currentStep - The ID of the step to be marked as completed.
 * @param {Step[]} steps - An array of Step objects representing the entire progress flow.
 * @param {(stepId: number) => void} [onStepComplete] - An optional callback function that is called with the ID of the next step after the current one is completed.
 * @returns {Step[]} A new array of Step objects with the `currentStep` marked as completed.
 */
export function handleStepComplete(
  currentStep: number,
  steps: Step[],
  onStepComplete?: (stepId: number) => void
): Step[] {
  // Update the steps array: mark the current step as completed.
  const updatedSteps = steps.map((step) => ({
    ...step,
    completed: step.id === currentStep ? true : step.completed,
  }));

  // Determine the ID of the next step.
  const nextStep = currentStep + 1;

  // If a callback function is provided, call it with the next step's ID.
  if (onStepComplete) {
    onStepComplete(nextStep);
  }

  // Return the newly updated steps array.
  return updatedSteps;
}

// Define the initial array of steps for the progress tracker.
// Each step includes a unique ID, a title, and a completion status.
export const initialSteps: Step[] = [
  {
    id: 1,
    title: "Welcome",
    completed: true,
  },
  {
    id: 2,
    title: "Select Beneficiary",
    completed: false,
  },
  {
    id: 3,
    title: "Create Account",
    completed: false,
  },
  {
    id: 4,
    title: "Fundraiser Details",
    completed: false,
  },
  {
    id: 5,
    title: "Payment Details",
    completed: false,
  },
  {
    id: 6,
    title: "Launch Fundraise",
    completed: false,
  },
];

/**
 * Default steps configuration for the progress tracker
 */
export const defaultSteps: Step[] = [
  {
    id: 1,
    title: "Welcome",
    completed: true,
  },
  {
    id: 2,
    title: "Select Beneficiary",
    completed: false,
  },
  {
    id: 3,
    title: "Create Account",
    completed: false,
  },
  {
    id: 4,
    title: "Fundraiser Details",
    completed: false,
  },
  {
    id: 5,
    title: "Payment Details",
    completed: false,
  },
  {
    id: 6,
    title: "Launch Fundraise",
    completed: false,
  },
]; 