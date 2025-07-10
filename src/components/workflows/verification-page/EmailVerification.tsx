import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import RHFTextField from "../../form/RHFTextField";
import { useNavigate, useOutletContext } from 'react-router-dom';
import useAuthCtx from "@contexts/auth/use-auth";
import { handleErrors } from "@lib/utils";
import { enqueueSnackbar } from "notistack";
import { LayoutContextType } from "@layouts/registration";
import { VerificationFormData, verificationSchema } from "../Signup-page/validation";
import { PATHS } from "config";
import { useFundraiserTypeStore } from "stores/fundraiser-form";


interface EmailVerificationProps {
  onBack: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onBack }) => {
  const {user,verifyAccount} = useAuthCtx();
  const navigate = useNavigate();
  const { selectedFundraiserType } = useFundraiserTypeStore();
  
  const { handleStepComplete } = useOutletContext<LayoutContextType>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const form = useForm<VerificationFormData>({
    resolver: yupResolver(verificationSchema),
    defaultValues: {
      email_address: user?.email_address ?? undefined,
    }
  });
  
  const { handleSubmit, reset, formState: { isSubmitting} } = form;

  
  const handleVerification = async (formData: VerificationFormData) => {
    try {
      if (!user?.email_address) return;
      const result = await verifyAccount(formData);

      if (result.type === "success") {
        enqueueSnackbar(result.message || "Account verified successfully!", { variant: "success" })
        // Reset form
        reset()
        setIsSuccess(true);
      } else {
        handleErrors(result.message || "Something went wrong");
      }
      
    } catch (error) {
      handleErrors(error);
    }
  }

  const handleContinue = () => {
    if (!selectedFundraiserType) {
      navigate(PATHS.dashboard.index);
    } else {
    handleStepComplete('create-account');
      
    }
  };

  // Success page
  if (isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-3xl w-full text-center p-8 mx-auto">
          <CardContent className="items-center">
            <div style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              border: '2px solid #B7EFC5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#E9F9EF"/><path d="M16 24.5L22 30.5L32 18.5" stroke="#217A3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <CardTitle className="mb-3">Verification Successful!</CardTitle>
            <CardDescription className="mb-6">
              Your account has been verified successfully. Let's<br/>continue setting up your fundraiser.
            </CardDescription>
            <Button size="lg" className="w-full max-w-xs bg-[#F97342] hover:bg-[#F97342]/90" onClick={handleContinue}>
                Continue to {!selectedFundraiserType ? 'Your Dashboard' : 'Fundraiser Details'} <span style={{marginLeft: 8}}>&rarr;</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="max-w-3xl w-full p-8 mx-auto">
        <CardHeader>
          <CardTitle>Verify your email address</CardTitle>
          <CardDescription>
            We have sent a 6-digit code to your email, check your inbox or spam folder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(handleVerification)}>
              <RHFTextField
                name="code"
                label="The 6-digit code"
                maxLength={6}
                className="text-3xl text-center tracking-[0.3em] font-medium"
                placeholder="------"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\\D/g, "");
                  form.setValue("code", e.target.value, { shouldValidate: true });
                }}
              />
              <div className="flex gap-4 mt-4">
                <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onBack}>
                  <span className="text-xl">&larr;</span> Back
                </Button>
                <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                  Verify
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification; 