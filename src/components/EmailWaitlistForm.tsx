import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useSnackbar } from 'notistack';
import { BASE_URL } from "config"

// Define validation schema using Yup
const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
     name: yup.string().notRequired().default(''),
  })
  

// Define the form data type
type FormData = yup.InferType<typeof schema>

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

 const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
    },
  })

  // Initialize React Hook Form with Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods

  // Handle form submission
  const onSubmit = async (data: FormData) => {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Form submitted successfully:", result);
      enqueueSnackbar("You've been added to our waitlist. We'll notify you when we launch!", { variant: "success" });
      reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      enqueueSnackbar(error.message || "Please try again later.", { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-auto items-start">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <Input
          {...register("name")}
          placeholder="Enter your name"
          className="rounded-full border-[#e5e1e1] pr-4 w-full md:w-48 opacity-70 text-sm"
          disabled={isSubmitting}
        />
        <div className="relative w-full md:w-48">
          <Input
            {...register("email")}
            placeholder="Enter your email address"
            className="rounded-full border-[#e5e1e1] w-full px-4 py-3 opacity-70 text-sm"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-3 absolute">{errors.email.message}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 mt-2 md:mt-0"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Join The Waitlist"}
      </Button>
    </form>
    </FormProvider>
  )
}
