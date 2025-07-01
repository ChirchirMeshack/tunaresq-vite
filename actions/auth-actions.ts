// "use server"

import { SignUpFormData } from "@components/workflows/Signup-page/validation";
import { createUser, socialLogin } from "../src/lib/auth"

export async function signupAction(formData: SignUpFormData) {
  try {
    const {firstname, lastname, email_address, password} = formData;


    const result = await createUser(email_address, password, firstname, lastname)

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
