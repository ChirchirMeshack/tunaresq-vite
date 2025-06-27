/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER as User } from "types/user";

interface DashboardStats {
  teams: number;
  projects: number;
}


export type AuthCtx = {
  user: User | null;
  dashboardStats: DashboardStats;
  loginWithGoogle: () => Promise<{ message: string; type: string }>;
  loginWithFacebook: () => Promise<{ message: string; type: string }>;
  loginWithTwitter: () => Promise<{ message: string; type: string }>;
  credentialsLogin: (loginData: {
    email: string;
    password: string;
  }) => Promise<{ message: string; type: string }>;
  credentialsSignUp: (
    signUpData: any
  ) => Promise<{ message: string; type: string }>;
  // updateUser: (data: SetupFormData) => void;
  logout: () => void;
};

export enum AuthActionsTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
  UPDATEUSER = "UPDATEUSER",
  UPDATEDASHBOARDSTATS = "UPDATEDASHBOARDSTATS",
}

export type AuthState = {
  user: null | User;
  dashboardStats: DashboardStats;
  isAdmin: boolean;
};

export type AuthActions =
  | {
      type: AuthActionsTypes.LOGIN;
      payload: { user: User; isAdmin: boolean };
    }
  | {
      type: AuthActionsTypes.REGISTER;
      payload: { user: User; isAdmin: boolean };
    }
  | {
      type: AuthActionsTypes.UPDATEUSER;
      payload: User;
    }
  | {
      type: AuthActionsTypes.LOGOUT;
      payload: null;
    }
  | {
      type: AuthActionsTypes.UPDATEDASHBOARDSTATS;
      payload: DashboardStats;
    };
