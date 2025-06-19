"use server"

// Simulate user creation
export async function createUser(email: string, password: string, firstName: string, lastName: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate validation
  if (!email || !password || !firstName || !lastName) {
    throw new Error("All fields are required")
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters")
  }

  // Simulate email already exists
  if (email === "test@example.com") {
    throw new Error("Email already exists")
  }

  // Simulate successful user creation
  console.log("User created:", { email, firstName, lastName })
  return { success: true, message: "Account created successfully!" }
}

// Simulate social login
export async function socialLogin(provider: "google" | "facebook" | "twitter") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful social login
  console.log(`${provider} login successful`)

  // In a real app, you would redirect to the OAuth provider
  // For demo purposes, we'll just simulate success
  return { success: true, message: `Successfully signed up with ${provider}!` }
}
