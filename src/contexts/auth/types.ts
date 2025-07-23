/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignUpFormData, VerificationFormData } from "@components/workflows/Signup-page/validation";
import { USER as User } from "types/user";


export type AuthCtx = {
  user: User | null;
  loginWithGoogle: () => Promise<{ message: string; type: string }>;
  loginWithFacebook: () => Promise<{ message: string; type: string }>;
  loginWithTwitter: () => Promise<{ message: string; type: string }>;
  verifyAccount: (data: VerificationFormData) => Promise<{ message: string; type: string }>;
  retryAccountVerification: (email: string) => Promise<{ message: string; type: string }>;
  credentialsLogin: (loginData: {
    email: string;
    password: string;
  }) => Promise<{ message: string; type: string }>;
  credentialsSignUp: (
    signUpData: SignUpFormData
  ) => Promise<{ message: string; type: string }>;
  // updateUser: (data: SetupFormData) => void;
  logout: () => void;
};

export enum AuthActionsTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
  UPDATEUSER = "UPDATEUSER",
}

export type AuthState = {
  user: null | User;
};

export type AuthActions =
  | {
      type: AuthActionsTypes.LOGIN;
      payload: { user: User; };
    }
  | {
      type: AuthActionsTypes.REGISTER;
      payload: { user: User; };
    }
  | {
      type: AuthActionsTypes.UPDATEUSER;
      payload: User;
    }
  | {
      type: AuthActionsTypes.LOGOUT;
      payload: null;
    };
