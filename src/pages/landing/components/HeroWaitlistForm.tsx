import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@components/ui/button"
import { Form } from "@components/ui/form"
import { BASE_URL } from "config"
import axiosInstance from "@lib/axios"
import { handleErrors } from "@lib/utils"
import { FormValues, formSchema, DefaultWaitListFormValues } from "@pages/landing-page/components/waitlist-form-validation";
import { TextField } from "./form"
import { enqueueSnackbar } from "notistack"

/**
 * WaitlistForm Component
 * 
 * A form component that allows users to join a waitlist by providing their name and email.
 * Features:
 * - Form validation using Yup schema
 * - Success and error message handling
 * - Responsive design
 * - Snackbar notifications for additional feedback
 */
export default function WaitlistForm() {
  // State management for form submission status and messages
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Initialize form with validation schema and default values
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: DefaultWaitListFormValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods

  /**
   * Handles form submission
   * @param formData - The form data containing name and email
   */
  const onSubmit = async (formData: FormValues) => {
    try {
      // Make API request to join waitlist
      const response = await axiosInstance.post(`${BASE_URL}/waitlist`, formData);
      
      // Extract message from response
      const { message } = response.data;

      // Handle successful submission
      setIsSuccess(true);
      setSuccessMessage(message || 'Thank you for joining our waitlist!');
      setErrorMessage(""); // Clear any existing error message
      enqueueSnackbar(message || 'Thank you for joining our waitlist!', { 
        variant: "success"
      });

      // Reset form after successful submission
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Extract error message from response if available
      const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again.";

      // Handle different error scenarios
      if (error.status === 429) {
        const message = "Too many requests. Please try again later.";
        setErrorMessage(message);
        enqueueSnackbar(message, { 
          variant: "warning"
        });
      } else if (error.status === 409) {
        const message = "Looks like you've already signed up to the waitlist, check your email for confirmation.";
        setErrorMessage(message);
        enqueueSnackbar(message, { 
          variant: "info"
        });
        reset();
      } else {
        setErrorMessage(errorMessage);
        handleErrors(errorMessage);
      }
      setIsSuccess(false);
      setSuccessMessage("");
    }
  }

  return (
    <div className="mx-auto">
      {/* <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#111827] mb-4 text-center">Join Our Waitlist</h2>
      <p className="text-[#3f4550] mb-6 text-center">
        Be the first to know when we launch and get early access to our platform. Join our waitlist to stay updated.
      </p> */}

      {/* Message Container - Shows either success or error message */}
      <div className="mb-4">
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center font-inter text-sm">
            {successMessage}
          </div>
        ) : errorMessage ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center font-inter text-sm">
            {errorMessage}
          </div>
        ) : null}
      </div>

      {/* Form Container - Only shown when not in success state */}
      {!isSuccess && (
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-auto items-start">
            {/* Input Fields Container */}
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <TextField
                name="name"
                hideLabel
                label="Full Name"
                placeholder="Enter your name"
                className="rounded-full border-[#79767D] pr-4 w-full opacity-70 text-sm"
              />
              <TextField
                name="email"
                hideLabel
                label="Email Address"
                placeholder="Enter your email address"
                className="rounded-full border-[#79767D] w-full px-4 py-3 opacity-70 text-sm"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 mt-2 md:mt-0 mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Join The Waitlist"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
