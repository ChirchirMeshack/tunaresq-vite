"use client"

import { useState, useTransition } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Separator } from "@components/ui/separator"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signupAction, handleSocialLogin } from "../../../../actions/auth-actions"

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signupAction(formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Account created successfully!" })
        // Reset form
        const form = document.getElementById("signup-form") as HTMLFormElement
        form?.reset()
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong" })
      }
    })
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

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
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
              <span className="whitespace-nowrap">Google</span>
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
              <span className="whitespace-nowrap">Facebook</span>
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
              <span className="whitespace-nowrap">X</span>
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
          <form id="signup-form" action={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  type="text"
                  className="text-sm sm:text-base"
                  required
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  type="text"
                  className="text-sm sm:text-base"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter a valid email address"
                type="email"
                className="text-sm sm:text-base"
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Enter Your Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="text-sm sm:text-base pr-10"
                  required
                  minLength={6}
                  disabled={isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Your Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="text-sm sm:text-base pr-10"
                  required
                  minLength={6}
                  disabled={isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isPending}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            
          </form>

          
        </CardContent>
      </Card>
    </div>
  )
}

