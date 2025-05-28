import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@components/ui/button"
import { Form } from "@components/ui/form"
import { BASE_URL } from "config"
import axiosInstance from "@lib/axios"
import { FormValues } from "@pages/landing-page/waitlist-form-validation"
import { handleErrors } from "@lib/utils"
import { TextField } from "./form"

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

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: DefaultFormValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods

  // Handle form submission
  const onSubmit = async (formData: FormValues) => {
    try {
      await axiosInstance.post(`${BASE_URL}/waitlist`, formData);

      // Show success message
      setIsSuccess(true)

      // Reset form after submission
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error.message || "An error occurred. Please try again.");
      setIsSuccess(false);
    }
  }

  return (
    <div className="mx-auto">
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
            
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <TextField
              name="name"
              hideLabel
              label="Full Name"
              placeholder="Enter your name"
              className="rounded-full border-[#79767D] pr-4 w-full opacity-70 text-sm"/>
<TextField
              name="email"
              hideLabel
              label="Email Address"
              placeholder="Enter your email address"
              className="rounded-full border-[#79767D] w-full px-4 py-3 opacity-70 text-sm"
              />
            </div>

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
