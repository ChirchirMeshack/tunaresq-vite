import { FC, useState } from "react";
import { Card, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { CustomButton } from "@components/ui/button";
import useAuthCtx from "@contexts/auth/use-auth";
import { handleErrors } from "@lib/utils";
import { enqueueSnackbar } from "notistack";


interface VerificationFailedProps {
  handleNextStep: () => void
}

const VerificationFailed: FC<VerificationFailedProps> = ({ handleNextStep }) => {
  const {user, retryAccountVerification} = useAuthCtx();
  const [isLoading, setIsLoading] = useState(false);
  
  

  
  const handleRetryVerification = async () => {
    setIsLoading(true);
    try {
      if (!user?.email_address) return;
      const result = await retryAccountVerification(user.email_address);

      if (result.type === "success") {
        enqueueSnackbar(result.message || "Code resent successfully!", { variant: "success" })
        handleNextStep();
      } else {
        handleErrors(result.message || "Something went wrong");
      }
      
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  }

  
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-3xl w-full text-center p-8 mx-auto">
          <CardContent className="items-center">
            <div style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            // border: '2px solid #f70808',
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
            <CustomButton isLoading={isLoading} size="lg" className="w-full max-w-xs bg-[#F97342] hover:bg-[#F97342]/90" onClick={handleRetryVerification}>
                Resend Code <span style={{marginLeft: 8}}>&rarr;</span>
            </CustomButton>
          </CardContent>
        </Card>
      </div>
    )
};

export default VerificationFailed; 