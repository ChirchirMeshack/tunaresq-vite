import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "@components/ui/button"
import { Form } from "@components/ui/form"
import { BASE_URL } from "config";
import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";
import { FormValues, formSchema, DefaultWaitListFormValues } from "./validation";
import { enqueueSnackbar } from "notistack";
import { TextField } from "@components/form";


export default function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>("")

  // Initialize the form with react-hook-form
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: DefaultWaitListFormValues,
});

const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
} = methods;

  // Handle form submission
  const onSubmit = async (formData: FormValues) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/waitlist`, formData);
      
      // Extract message from response
      const { message } = response.data;

      // Show success message with backend response
      setIsSuccess(true);
      setSuccessMessage(message || 'Thank you for joining our waitlist!');
      enqueueSnackbar(message || 'Thank you for joining our waitlist!', { 
        variant: "success"
      });

      // Reset form after submission
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Extract error message from response if available
      const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again.";

      if (error.status === 429) {
        enqueueSnackbar(`Too many requests. Please try again later.`, { 
          variant: "warning"
        });
      } else if (error.status === 409) {
        enqueueSnackbar(`Looks like you've already signed up to the waitlist, check your email for confirmation.`, { 
          variant: "info"
        });
        reset();
      } else {
        handleErrors(errorMessage);
      }
      setIsSuccess(false);
      setSuccessMessage("");
    }
  }

  return (
    <div className="bg-[#fff8f2] rounded-xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4 text-center font-playfair">Join Our Waitlist</h2>
      <p className="text-[#3f4550] mb-6 text-center font-inter">
        Be the first to know when we launch and get early access to our platform. Join our waitlist to stay updated.
      </p>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center font-inter text-sm">
          {successMessage}
        </div>
      ) : (
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              name="name"
              label="Full Name *"
              placeholder="Enter your name"
              className="rounded-lg border-[#e5e1e1]"/>
<TextField
              name="email"
              label="Email Address *"
              placeholder="Enter your email address"
              className="rounded-lg border-[#e5e1e1]"
              />

            <Button
              type="submit"
              className="w-full bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full"
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
