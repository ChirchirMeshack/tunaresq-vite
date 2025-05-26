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

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: DefaultFormValues,
  })

  const {
    handleSubmit,
    control,
    reset,
  } = methods

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      const response = await fetch(`${BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error instanceof Error ? error.message : "Please try again later.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#111827] mb-4 text-center">Join Our Waitlist</h2>
      <p className="text-[#3f4550] mb-6 text-center">
        Be the first to know when we launch and get early access to our platform. Join our waitlist to stay updated.
      </p> */}

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
          Thank you for joining our waitlist! We'll be in touch soon.
        </div>
      ) : (
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-auto items-start">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center w-full">
                {errorMessage}
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full md:w-48">
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        className="rounded-full border-[#e5e1e1] pr-4 w-full opacity-70 text-sm" 
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
                  <FormItem className="w-full md:w-48">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="rounded-full border-[#e5e1e1] w-full px-4 py-3 opacity-70 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 mt-2 md:mt-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SUBMITTING..." : "JOIN THE WAITLIST"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
