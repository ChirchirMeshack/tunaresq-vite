import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { useNavigate, useOutletContext } from 'react-router-dom';
import useAuthCtx from "@contexts/auth/use-auth";
import { handleErrors } from "@lib/utils";
import { enqueueSnackbar } from "notistack";
import { LayoutContextType } from "@layouts/registration";
import { PATHS } from "config";
import { useFundraiserTypeStore } from "stores/fundraiser-form";
import { TextField } from "@components/hook-form";
import { Form } from "@components/ui/form";
import { VerificationFormData, verificationSchema } from "@components/workflows/Signup-page/validation";


interface EmailVerificationProps {
  onBack: () => void;
}

const EmailVerification: FC<EmailVerificationProps> = ({ onBack }) => {
  const {user,verifyAccount,retryAccountVerification} = useAuthCtx();
  const navigate = useNavigate();
  const { selectedFundraiserType } = useFundraiserTypeStore();
  
  const { handleStepComplete } = useOutletContext<LayoutContextType>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  
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

  
  const handleRetryVerification = async () => {
    try {
      if (!user?.email_address) return;
      const result = await retryAccountVerification(user.email_address);

      if (result.type === "success") {
        enqueueSnackbar(result.message || "Code resent successfully!", { variant: "success" })
        setVerificationFailed(false);
        setIsSuccess(true);
      } else {
        setVerificationFailed(true);
        handleErrors(result.message || "Something went wrong");
      }
      
    } catch (error) {
      handleErrors(error);
    }
  }

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
  
  // Error Retry page
  if (verificationFailed) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-3xl w-full text-center p-8 mx-auto">
          <CardContent className="items-center">
            <div style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '2px solid #f70808',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
          }}>
            {/* error icon */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#080808"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#f70808" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <CardTitle className="mb-3">Verification Failed!</CardTitle>
            <CardDescription className="mb-6">
              Account verification failed. Please try again.<br/>
            </CardDescription>
            <Button size="lg" className="w-full max-w-xs bg-[#F97342] hover:bg-[#F97342]/90" onClick={handleRetryVerification}>
                Resend Code <span style={{marginLeft: 8}}>&rarr;</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
          <Form {...form}>
            <form onSubmit={handleSubmit(handleVerification)}>
              <TextField
                name="code"
                label="The 6-digit code"
                required
                maxLength={6}
                placeholder="Enter the 6-digit code here"
              />
            </form>
              <div className="flex gap-4 mt-4">
                <Button type="button" variant="outline" className="h-12 flex-1" onClick={onBack}>
                  <span className="text-xl">&larr;</span> Back
                </Button>
                <Button
                // type="submit"
                type="button"
                onClick={() => setIsSuccess(true)}
                className="h-12 flex-1" disabled={isSubmitting}>
                  Verify
                </Button>
              </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification; 