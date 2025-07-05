import { Outlet} from "react-router-dom";
import Progress from "./progress";
import Header from "./header";
import { defaultSteps, Step } from "@lib/progressUtils";
import { useEffect, useState } from "react";
import { getAllFundraiserTypes } from "api/fundraiser-type";
import { handleErrors } from "@lib/utils";
import { useFundraiserTypeStore } from "stores/fundraiser-form";

export type LayoutContextType = {
  steps: Step[];
  currentStep: string;
  onboardingComplete: boolean;
  setOnboardingComplete: () => void;
  handleStepComplete: (stepId: string) => void;
  setCurrentStep: (stepId: string) => void;
  handleBackStep: (stepId: string) => void
}

const RegistrationLayout = () => {
  const [steps, setSteps] = useState(defaultSteps);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const {fundraiserTypes, updateFundraiserTypes} = useFundraiserTypeStore();

  const handleStepComplete = (currentStepId: string) => {
    const updatedSteps = steps.map((step) => ({
      ...step,
      completed: step.id === currentStepId ? true : step.completed,
    }));

    const currentStepObj = steps.find((step) => step.id === currentStepId);
    if (currentStepObj) {
      const nextStep = steps.find((step) => step.no === currentStepObj.no + 1);
      if (nextStep) {
        setCurrentStep(nextStep.id);
      }
    }

    setSteps(updatedSteps);
  };
  const handleBackStep = (currentStepId: string) => {
  const currentStepObj = steps.find((step) => step.id === currentStepId);
  if (!currentStepObj) return;

  const updatedSteps = steps.map((step) => {
    if (step.no === currentStepObj.no) {
      return { ...step, completed: false };
    } else if (step.no > currentStepObj.no) {
      return { ...step, completed: false };
    } else {
      return step;
    }
  });

  setCurrentStep(currentStepId);
  setSteps(updatedSteps);
};


  const layoutContext = {
    steps,
    currentStep,
    handleStepComplete,
    setCurrentStep,
    handleBackStep,
    onboardingComplete,
    setOnboardingComplete
  };

  const fetchFundraiserTypes = async () => {
    try {
    const response = await getAllFundraiserTypes();
      if (!response.data) {
        handleErrors(response.error);
      }
      updateFundraiserTypes(response.data);
    } catch (error) {
      handleErrors(error);
    }
  }

  useEffect(() => {
    if(fundraiserTypes.length === 0) {
      fetchFundraiserTypes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      {/* Header */}
      <Header /> 

      {/* Main registration container with matching horizontal padding */}
      <div className="px-4 md:px-12 lg:px-24">
        {/* Progress Indicator */}
        <Progress 
          currentStep={currentStep} 
          steps={steps} 
          onStepComplete={handleStepComplete}
        />

        {/* content */}
        <Outlet context={layoutContext} />
      </div>
    </>
  );
};

export default RegistrationLayout;
