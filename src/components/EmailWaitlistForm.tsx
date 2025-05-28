{/* 
  ENHANCED ERROR HANDLING FOR WAITLIST FORM
  
  ADDED FEATURES:
  1. Specific handling for 429 (Too Many Requests) status code
  2. User-friendly messages for rate limiting
  3. Improved error categorization and messaging
  4. Better UX with clear instructions for users
*/}

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form"
import { BASE_URL } from "config"

// Define validation schema using Yup
const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    name: yup.string().required("Full name is required").default(''),
  })

// Define the form data type
type FormData = yup.InferType<typeof schema>

// Define default form values
const DefaultFormValues: FormData = {
  email: "",
  name: "",
}

export default function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // NEW: Track if user hit rate limit for better UX
  const [isRateLimited, setIsRateLimited] = useState(false)

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: DefaultFormValues,
  })

  const {
    handleSubmit,
    control,
    reset,
  } = methods

  // NEW: Enhanced error message handler
  const getErrorMessage = (error: any, status?: number): string => {
    // Handle 429 - Too Many Requests specifically
    if (status === 429) {
      setIsRateLimited(true)
      return "You've already joined our waitlist recently. Please wait 24 hours before trying again."
    }

    // Handle rate limiting message from API
    if (error.message && error.message.includes("Submission limit reached")) {
      setIsRateLimited(true)
      return "You've already joined our waitlist! Please wait 24 hours before submitting again."
    }

    // Handle other specific error messages
    if (error.message && error.message.includes("already exists")) {
      return "This email is already on our waitlist. Thank you for your interest!"
    }

    // Handle network errors
    if (error.message && error.message.includes("Failed to fetch")) {
      return "Network error. Please check your connection and try again."
    }

    // Handle server errors
    if (status && status >= 500) {
      return "Our servers are experiencing issues. Please try again in a few minutes."
    }

    // Default error message
    return error.message || "Something went wrong. Please try again later."
  }

  // Handle form submission with enhanced error handling
  const onSubmit = async (data: FormData) => {
    setErrorMessage(null)
    setIsRateLimited(false) // Reset rate limit state
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // NEW: Enhanced error handling with status code checking
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // If JSON parsing fails, create a generic error
          errorData = { message: `Server error (${response.status})` };
        }

        // Create error with status code for better handling
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        throw { ...error, status: response.status, data: errorData };
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setIsSuccess(true);
      reset();
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      const friendlyMessage = getErrorMessage(error, error.status);
      setErrorMessage(friendlyMessage);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto">
      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
          Thank you for joining our waitlist! We'll be in touch soon.
        </div>
      ) : (
        <Form {...methods}>
          {/* Previous form structure: flex flex-col md:flex-row gap-2 w-auto items-start */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-auto items-end">
            
            {/* NEW: Enhanced error display with different styling for rate limits */}
            {errorMessage && (
              <div className={`border p-4 rounded-lg text-center w-full mb-4 ${
                isRateLimited 
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-800' // Different color for rate limits
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  {isRateLimited && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{errorMessage}</span>
                </div>
                {isRateLimited && (
                  <p className="text-sm mt-2 opacity-80">
                    Don't worry - you're already on our list! We'll notify you when we launch.
                  </p>
                )}
              </div>
            )}
            
            {/* Form fields remain the same structure */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-48">
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      className="rounded-full border-[#79767D] pr-4 w-full opacity-70 text-sm" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-56">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="rounded-full border-[#79767D] w-full px-4 py-3 opacity-70 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* NEW: Enhanced button with rate limit awareness */}
            <Button
              type="submit"
              className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 mx-auto md:mx-0 disabled:opacity-50"
              disabled={isSubmitting || isRateLimited}
            >
              {isSubmitting 
                ? "Submitting..." 
                : isRateLimited 
                  ? "Already Submitted" 
                  : "Join The Waitlist"
              }
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}