import { Outlet} from "react-router-dom";
import Progress from "./progress";
import Header from "./header";
import { defaultSteps } from "@lib/progressUtils";
import { useState } from "react";

const RegistrationLayout = () => {
  const [steps, setSteps] = useState(defaultSteps);
  const [currentStep, setCurrentStep] = useState<string>('welcome');

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

  const layoutContext = {
    steps,
    currentStep,
    handleStepComplete,
    setCurrentStep,
  };

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
