export const BASE_URL = import.meta.env.VITE_BASE_URL;

// paths
export const PATHS = {
  home: "/",
  login: (redirect?: string) =>
    redirect ? `/auth/login?redirect=${redirect}` : "/auth/login",
  signup: "/auth/register",
  contactUs: "/contact-us",
  forgotPassword: "/auth/forgot-password",
  dashboard: {
    index: "/dashboard",
    profile: "/dashboard/profile",
    settings: "/dashboard/settings",
    },
  fundraiser: {
      index: "/fundraisers",
      create: "/fundraisers/create",
      view: (id: string) => `/fundraisers/${id}`,
      edit: (id: string) => `/fundraisers/${id}/edit`,
    },
};

export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
export const FIREBASE_MEASUREMENTID = import.meta.env.VITE_FIREBASE_MEASUREMENTID;