"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the form schema with validation rules
const formSchema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
  });

// Define the form values type
type FormValues = yup.InferType<typeof formSchema>

// Define the default form values
const DefaultWaitListFormValues: FormValues = {
    fullName: "",
    email: "",
};

export default function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false)

  // Initialize the form with react-hook-form
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: DefaultWaitListFormValues,
});

const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
} = methods;

  // Handle form submission
  const onSubmit = async (data: FormValues) => {

    try {
      // Log the form data to the console
      console.log("Form submitted:", data)

      // Show success message
      setIsSuccess(true)

      // Reset form after 
        reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="bg-[#fff8f2] rounded-xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#111827] mb-4 text-center">Join Our Waitlist</h2>
      <p className="text-[#3f4550] mb-6 text-center">
        Be the first to know when we launch and get early access to our platform. Join our waitlist to stay updated.
      </p>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
          Thank you for joining our waitlist! We'll be in touch soon.
        </div>
      ) : (
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#3f4550]">Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className="rounded-lg border-[#e5e1e1]" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#3f4550]">Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="rounded-lg border-[#e5e1e1]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full"
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
