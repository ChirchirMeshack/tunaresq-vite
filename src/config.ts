export const SERVER_API_KEY = import.meta.env.VITE_SERVER_API_KEY;

// paths
export const PATHS = {
  home: "/",
  login: (redirect?: string) =>
    redirect ? `/auth/login?redirect=${redirect}` : "/auth/login",
  signup: "/auth/signup",
  contactUs: "/contact-us",
  forgotPassword: "/auth/forgot-password",
};