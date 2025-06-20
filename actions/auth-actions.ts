"use server"

import { createUser, socialLogin } from "../src/lib/auth"

export async function signupAction(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validate passwords match
    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match",
      }
    }

    const result = await createUser(email, password, firstName, lastName)

    return {
      success: true,
      message: result.message,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}

export async function handleSocialLogin(provider: "google" | "facebook" | "twitter") {
  try {
    const result = await socialLogin(provider)
    return {
      success: true,
      message: result.message,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Social login failed",
    }
  }
}
