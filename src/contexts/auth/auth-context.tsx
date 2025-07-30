/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { AuthActions, AuthActionsTypes, AuthCtx, AuthState } from "./types";
import {
  // GoogleAuthProvider,
  signInWithPopup,
  signOut,
  // onAuthStateChanged,
  
  // FacebookAuthProvider,
  // TwitterAuthProvider,
} from "firebase/auth";
import { auth, googleAuthProvider, facebookAuthProvider, twitterAuthProvider } from "@lib/firebase";
import { SignUpFormData, VerificationFormData } from "@components/onboarding-forms/validation"
import { USER as User } from "types/user";
import { registerWithEmailAndPassword, signInWithEmailAndPassword, verifyAccount as emailVerification, signInWithFirebaseAuth, resendVerificationCode, logoutUser} from "api/auth";

export const AuthContext = createContext<AuthCtx | null>(null);

const defaultAuthState: AuthState = {
  user: null,
};


const authReducer = (state: AuthState, action: AuthActions) => {
  const { payload, type } = action;

  switch (type) {
    case AuthActionsTypes.LOGIN:
      return {
        ...state,
        user: payload.user,
      };

    case AuthActionsTypes.REGISTER:
      return {
        ...state,
        user: payload.user,
      };

    case AuthActionsTypes.UPDATEUSER:
      return { ...state, user: payload };

    case AuthActionsTypes.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

export const AuthCtxProvider = ({ children }: PropsWithChildren) => {
  const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      // Send user details from Google to backend
      const loginResp = await signInWithFirebaseAuth('google', result.user);

      
      if (!loginResp.data) {
        return {
          message: loginResp.message || "Login failed",
          type: "error",
        };
      } else {
        dispatch({
          type: AuthActionsTypes.LOGIN,
          payload: { user: loginResp.data.user },
        });
      }
      return { message: "Login Successful", type: "success" };
    } catch (error: any) {
      return { message: error.code, type: "error" };
    }
  }, []);
  const loginWithFacebook = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, facebookAuthProvider);

      // Send user details from Facebook to backend
      const loginResp = await signInWithFirebaseAuth('facebook', result.user);

      
      if (!loginResp.data) {
        return {
          message: loginResp.message || "Login failed",
          type: "error",
        };
      } else {
        dispatch({
          type: AuthActionsTypes.LOGIN,
          payload: { user: loginResp.data.user },
        });
      }
      return { message: "Login Successful", type: "success" };
    } catch (error: any) {
      return { message: error.code, type: "error" };
    }
  }, []);
  const loginWithTwitter = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, twitterAuthProvider);
      // Send user details from Twitter to backend
      const loginResp = await signInWithFirebaseAuth('twitter', result.user);

      
      if (!loginResp.data) {
        return {
          message: loginResp.message || "Login failed",
          type: "error",
        };
      } else {
        dispatch({
          type: AuthActionsTypes.LOGIN,
          payload: { user: loginResp.data.user },
        });
      }
      return { message: "Login Successful", type: "success" };
    } catch (error: any) {
      return { message: error.code, type: "error" };
    }
  }, []);

  const credentialsLogin = useCallback(async (data: any) => {
    try {
      // If user data exists, proceed with Firebase authentication
      const response = await signInWithEmailAndPassword(
        data.email,
        data.password
      );
      if (!response.data) {
        return {
          message: "No account found. Please sign up first.",
          type: "error",
        };
      }
      dispatch({
        type: AuthActionsTypes.LOGIN,
        payload: { user: response.data.user },
      });

      return { message: "Login Successful", type: "success" };
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        return { message: "Incorrect Email or Password", type: "error" };
      } else {
        return { message: "Account does not Exist", type: "error" };
      }
    }
  }, []);
  const credentialsSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        // If user data doesn't exist, proceed with Firebase authentication
        const response = await registerWithEmailAndPassword(data);
        
        if (!response.data) {
          return {
            message: "Account Creation Failed.",
            type: "error",
          };
        }

        dispatch({
          type: AuthActionsTypes.REGISTER,
          payload: { user: response.data?.user as User },
        });

        console.log(response.data);

        if (response.data?.warning !== undefined) {
          return {
            message: response.data.warning,
            type: "warning",
          };
        } else {
        return { message: "Sign Up Successful", type: "success" };
        }
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          return { message: "Email Address Already in use", type: "error" };
        } else {
          return { message: "Unable to create Account", type: "error" };
        }
      }
    },
    []
  );
  const verifyAccount = useCallback(
    async (data: VerificationFormData) => {
      try {
        // If user data doesn't exist, proceed with Firebase authentication
        const response = await emailVerification(data.email_address, data.code);

        if (!response.data) {
          return {
            message: "Account Verification Failed.",
            type: "error",
          };
        }
        dispatch({
          type: AuthActionsTypes.REGISTER,
          payload: { user: response.data?.user as User },
        });
        return { message: response.message, type: "success" };
      } catch (error) {
        console.log(error);
        return { message: "Unable to create Account", type: "error" };
      }
    },
    []
  );

  
  const retryAccountVerification = useCallback(
    async (email: string) => {
      try {
        // If user data doesn't exist, proceed with Firebase authentication
        const response = await resendVerificationCode(email);

        if (response.type === "error") {
          return {
            message: "Account Verification Failed.",
            type: "error",
          };
        }
        return response;
      } catch (error: any) {
        console.log(error);
          return { message: "Unable to create Account", type: "error" };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      // Call backend logout endpoint to clear httpOnly cookies
      await logoutUser();
      
      // Sign out from Firebase
      await signOut(auth);

      dispatch({
        type: AuthActionsTypes.LOGOUT,
        payload: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if backend logout fails, still clear local state
      dispatch({
        type: AuthActionsTypes.LOGOUT,
        payload: null,
      });
    }
  }, []);

  const authCtxValue = useMemo(
    () => ({
      user: authState.user,
      loginWithFacebook,
      loginWithGoogle,
      verifyAccount,
      retryAccountVerification,
      loginWithTwitter,
      credentialsLogin,
      credentialsSignUp,
      logout,
    }),
    [authState, loginWithFacebook, loginWithGoogle, verifyAccount, retryAccountVerification, loginWithTwitter, credentialsLogin, credentialsSignUp, logout]
  );

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};
