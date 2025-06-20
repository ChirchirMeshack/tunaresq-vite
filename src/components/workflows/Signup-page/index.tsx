
import { useState } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signupAction, handleSocialLogin } from "../../../../actions/auth-actions"
import { useOutletContext } from 'react-router-dom';
import { Step } from '@lib/progressUtils';
import EmailVerification from "../verification-page/EmailVerification"
import { RHFTextField as TextField } from "@components/form/RHFTextField"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { SignUpFormData, SignUpFormSchema, DefaultSignUpFormValues } from "./validation"
import { Form } from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

export default function SignupForm() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const updateShowPasswordState = () => setShowPassword((prev) => !prev);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const { setCurrentStep } = useOutletContext<{ steps: Step[]; currentStep: string; handleStepComplete: (stepId: string) => void; setCurrentStep: (stepId: string) => void }>();
  const [showEmailVerification, setShowEmailVerification] = useState(false);

	const handleBack = () => {
		setCurrentStep('select-beneficiary');
	};

  const methods = useForm<SignUpFormData>({
		resolver: yupResolver(SignUpFormSchema),
		defaultValues: DefaultSignUpFormValues,
	});

	const {
		handleSubmit,
    register,
    reset,
	} = methods;

  const handleSignupWithCredentials = async (formData: SignUpFormData) => {
      console.log(formData)
      const result = await signupAction(formData)

      if (result.success) {
		    setShowEmailVerification(true);

        setMessage({ type: "success", text: result.message || "Account created successfully!" })
        // Reset form
        reset()
        setShowEmailVerification(true)
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong" })
      }
  }

  const handleSocialSignup = async (provider: "google" | "facebook" | "twitter") => {
    setSocialLoading(provider)
    try {
      const result = await handleSocialLogin(provider)

      if (result.success) {
        setMessage({ type: "success", text: result.message || `Successfully signed up with ${provider}!` })
      } else {
        setMessage({ type: "error", text: result.error || "Social login failed" })
      }
    } finally {
      setSocialLoading(null)
    }
  }

  if (showEmailVerification) {
    return <EmailVerification />;
  }

  console.log(methods.formState.errors)
  return (
    <Form {...methods}>
    <div className=" md:w-full">
    <section >
    <div className="p-2 sm:p-4 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold ">Create Account</CardTitle>
          <CardDescription>Create an account to manage your fundraiser</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-2 sm:px-4">
          {/* Message Display */}
          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-2 py-2 sm:px-3 sm:py-3 text-xs"
              type="button"
              disabled={socialLoading !== null}
              onClick={() => handleSocialSignup("google")}
            >
              {socialLoading === "google" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <svg className="w-4 h-4 mr-1 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EB4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span className="whitespace-nowrap">Sign in with Google</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-2 py-2 sm:px-3 sm:py-3 text-xs"
              type="button"
              disabled={socialLoading !== null}
              onClick={() => handleSocialSignup("facebook")}
            >
              {socialLoading === "facebook" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <svg className="w-4 h-4 mr-1 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              )}
              <span className="whitespace-nowrap">Sign in with Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-2 py-2 sm:px-3 sm:py-3 text-xs"
              type="button"
              disabled={socialLoading !== null}
              onClick={() => handleSocialSignup("twitter")}
            >
              {socialLoading === "twitter" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <svg className="w-4 h-4 mr-1 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              )}
              <span className="whitespace-nowrap">Sign in with X</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit(handleSignupWithCredentials)} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <TextField name="firstName" label="First Name" placeholder="Enter your first name"/>
                <TextField name="lastName" label="Last Name" placeholder="Enter your last name"/>
              </div>

            <div className="space-y-2">
                <TextField name="email" label="Email Address" placeholder="Enter a valid email address"/>
                
                {/* <TextField
					className="focus:outline-none"
					name="password"
					label="Password"
					type={showPassword ? "text" : "password"} placeholder="Enter your password"
          endContent={
						<Button
							size="icon"
          type="button"
              className="rounded-full"
							onClick={updateShowPasswordState}
						>
              {showPassword ? (
							<EyeOff
								className="text-[#8f8f8f]"
								fontSize={24}
							/>
              ):(
							<Eye
								className="text-[#8f8f8f]"
								fontSize={24}
							/>
              )}
						</Button>}
					/>
          <TextField
					className="focus:outline-none"
					name="confirmPassword"
					label="Confirm Your Password"
					type={showPassword ? "text" : "password"} placeholder="Confirm your password"
          endContent={
						<Button
          type="button"
							size="icon"
              className="rounded-full"
							onClick={updateShowPasswordState}
						>
              {showPassword ? (
							<EyeOff
								className="text-[#8f8f8f]"
								fontSize={24}
							/>
              ):(
							<Eye
								className="text-[#8f8f8f]"
								fontSize={24}
							/>
              )}
						</Button>}
					/>*/}
              </div> 
<div className="space-y-2">
              <Label htmlFor="password">Enter Your Password</Label>
              <div className="relative">
                <Input
                  {...register('password')}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="text-sm sm:text-base pr-10"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                  onClick={updateShowPasswordState}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Your Password</Label>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  placeholder="Confirm your password"
                  type={showPassword ? "text" : "password"}
                  className="text-sm sm:text-base pr-10"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                  onClick={updateShowPasswordState}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            

          </form>

        </CardContent>
        
      </Card>
     
    </div>
    </section>
     <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-8">
					<Button
          type="button"
						onClick={handleBack}
						variant="outline"
						className="flex-1 max-w-xs rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4 sm:size-5 mr-1 sm:mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
							/>
						</svg>
						Back
					</Button>
					<Button
            type="submit"
						className="flex-1 max-w-xs rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						Continue
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4 sm:size-5 ml-1 sm:ml-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</Button>
				</div>
    </div>
    </Form>
  )
}

