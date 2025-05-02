"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

// Define validation schema using Yup
const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
  })
  .required()

// Define the form data type
type FormData = yup.InferType<typeof schema>

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize React Hook Form with Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Log success message
      console.log("Form submitted successfully with email:", data.email)

      // Show success toast
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
      })

      // Reset form
      reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="relative flex-grow">
        <Input
          {...register("email")}
          placeholder="Enter your email address"
          className="rounded-full border-[#e5e1e1] pr-4 w-full"
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-3 absolute">{errors.email.message}</p>}
      </div>
      <Button
        type="submit"
        className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Join The Waitlist"}
      </Button>
    </form>
  )
}
