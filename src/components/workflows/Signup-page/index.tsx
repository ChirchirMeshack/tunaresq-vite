import { useState } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import { useOutletContext } from 'react-router-dom';
import EmailVerification from "../verification-page/EmailVerification"
import { RHFTextField as TextField } from "@components/form/RHFTextField"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { SignUpFormData, SignUpFormSchema, DefaultSignUpFormValues } from "./validation"
import { Form } from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import useAuthCtx from "@contexts/auth/use-auth"
import { enqueueSnackbar } from "notistack"
import { handleErrors } from "@lib/utils"
import { registerWithEmailAndPassword } from "api/auth"
import { LayoutContextType } from "@layouts/registration"

export default function SignupForm() {
  const {loginWithFacebook, loginWithGoogle, loginWithTwitter} = useAuthCtx()
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const updateShowPasswordState = () => setShowPassword((prev) => !prev);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const { handleBackStep, handleStepComplete } = useOutletContext<LayoutContextType>();
  const [showEmailVerification, setShowEmailVerification] = useState(false);

	const handleBack = () => {
		handleBackStep('select-beneficiary');
	};

  const methods = useForm<SignUpFormData>({
		resolver: yupResolver(SignUpFormSchema),
		defaultValues: DefaultSignUpFormValues,
	});

	const {
		handleSubmit,
    register,
    reset,
    formState: { errors },
	} = methods;

  const handleSignupWithCredentials = async (formData: SignUpFormData) => {
    try {
      const result = await registerWithEmailAndPassword(formData)

      if (result.data) {
		    setShowEmailVerification(true);

        setMessage({ type: "success", text: result.message || "Account created successfully!" })
        // Reset form
        reset()
      } else {
        setMessage({ type: "error", text: result.message || "Something went wrong" })
      }
      
    } catch (error) {
      handleErrors(error);
    }
    handleStepComplete('create-account');
  }

  const handleSocialSignup = async (provider: "google" | "facebook" | "twitter") => {
    setSocialLoading(provider)
    try {
      let result;
      switch (provider) {
        case "google":
          result = await loginWithGoogle()
          break
        case "facebook":
          result = await loginWithFacebook()
          break
        case "twitter":
          result = await loginWithTwitter()
          break
      }
      const { message, type } = result;
      const variant = type as
        | "default"
        | "success"
        | "warning"
        | "error"
        | "info";
      enqueueSnackbar(message, { variant });

      // if (result.success) {
      //   setMessage({ type: "success", text: result.message || `Successfully signed up with ${provider}!` })
      // } else {
      //   setMessage({ type: "error", text: result.error || "Social login failed" })
      // }
      } catch (err) {
      handleErrors(err);
    
    } finally {
      setSocialLoading(null)
    }
  }

  if (showEmailVerification) {
    return <EmailVerification onBack={() => setShowEmailVerification(false)} />;
  }

  return (
    <Form {...methods}>
    <div className=" md:w-full ">
    <section >
    <div className="p-2 sm:p-4 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
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
          <form
           onSubmit={handleSubmit(handleSignupWithCredentials)} 
           className="space-y-3 sm:space-y-4"
           id="signup-form"
           >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <TextField name="firstname" label="First Name" placeholder="Enter your first name"/>
                <TextField name="lastname" label="Last Name" placeholder="Enter your last name"/>
              </div>
            <div className="space-y-2">
                <TextField name="email_address" label="Email Address" placeholder="Enter a valid email address"/>
                
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
                  {/* {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
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
                  {/* {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            

          </form>

        </CardContent>
        
      </Card>
     
    </div>
    </section>
     <div className="w-full max-w-3xl sm:max-w-md md:max-w-3xl lg:max-w-3xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-2">
					<Button
          type="button"
						onClick={handleBack}
						variant="outline"
						className="w-[120px] md:w-[150px] rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						<ArrowLeft className="size-4 sm:size-5" />
						Back
					</Button>
					<Button
            //type="submit"
            type="button"
            onClick={() => handleStepComplete('create-account')}
            form="signup-form"
						className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						Continue
						<ArrowRight className="size-4 sm:size-5" />
					</Button>
				</div>
    </div>
    </Form>
  )
}

