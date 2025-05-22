export const BASE_URL = import.meta.env.VITE_BASE_URL;

// paths
export const PATHS = {
  home: "/",
  login: (redirect?: string) =>
    redirect ? `/auth/login?redirect=${redirect}` : "/auth/login",
  signup: "/auth/signup",
  contactUs: "/contact-us",
  forgotPassword: "/auth/forgot-password",
};