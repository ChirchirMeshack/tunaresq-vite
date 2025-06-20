// Simulate user creation
export async function createUser(email: string, _password: string, firstName: string, lastName: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))


  // Simulate successful user creation
  console.log("User created:", { email, firstName, lastName })
  return { success: true, message: "Account created successfully!", user: { email, firstName, lastName } }
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
