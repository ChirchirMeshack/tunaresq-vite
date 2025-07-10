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
import useLocalStorage from "@hooks/use-local-storage";
import {
  // GoogleAuthProvider,
  signInWithPopup,
  signOut,
  // onAuthStateChanged,
  
  // FacebookAuthProvider,
  // TwitterAuthProvider,
} from "firebase/auth";
import { auth, googleAuthProvider, facebookAuthProvider, twitterAuthProvider } from "@lib/firebase";
import { SignUpFormData, VerificationFormData } from "@components/workflows/Signup-page/validation"
import { USER as User } from "types/user";
import { registerWithEmailAndPassword, signInWithEmailAndPassword, verifyAccount as emailVerification, signInWithFirebaseAuth} from "api/auth";

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
  const { storeItem, deleteItem } = useLocalStorage();

  // useEffect(() => {
  //   // Listen for auth state changes
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // User is signed in, you can fetch additional user data here
  //       const loginResp = await getLoggedInUserData(user.uid);

  //       if (loginResp !== "User details not found") {
  //         dispatch({
  //           type: AuthActionsTypes.LOGIN,
  //           payload: { user: loginResp },
  //         });
  //       }
  //     } else {
  //       // User is signed out, handle state reset if needed
  //       dispatch({ type: AuthActionsTypes.LOGOUT, payload: null });
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      // Send user details from Google to backend
      const loginResp = await signInWithFirebaseAuth('google', result.user);

      
      if (!loginResp.data) {
        return {
          message: loginResp.message || "Login failed",
          type: "error",
        };
      } else {
      await storeItem("tunaresq-access-token", loginResp.data.access_token);
      await storeItem("tunaresq-token-expiry", loginResp.data.expires_in.toString());
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
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      // Send user details from Facebook to backend
      const loginResp = await signInWithFirebaseAuth('facebook', result.user);

      
      if (!loginResp.data) {
        return {
          message: loginResp.message || "Login failed",
          type: "error",
        };
      } else {
      await storeItem("tunaresq-access-token", loginResp.data.access_token);
      await storeItem("tunaresq-token-expiry", loginResp.data.expires_in.toString());
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
      // const credential = TwitterAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      // Send user details from Twitter to backend
      const loginResp = await signInWithFirebaseAuth('twitter', result.user);

      
      if (!loginResp.data) {
        return {
          message: loginResp.message || "Login failed",
          type: "error",
        };
      } else {
      await storeItem("tunaresq-access-token", loginResp.data.access_token);
      await storeItem("tunaresq-token-expiry", loginResp.data.expires_in.toString());
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
      await storeItem("tunaresq-access-token", response.data.access_token);
      await storeItem("tunaresq-token-expiry", response.data.expires_in.toString());
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

      await storeItem("tunaresq-access-token", response.data?.tokens.access as string);
      // await storeItem("tunaresq-user", JSON.stringify(response.data?.user));
      await storeItem("tunaresq-refresh-token", response.data?.tokens.refresh as string);

        dispatch({
          type: AuthActionsTypes.REGISTER,
          payload: { user: response.data?.user as User },
        });
        return { message: "Sign Up Successful", type: "success" };
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

      // await storeItem("tunaresq-access-token", response.data?.tokens.access as string);
      // await storeItem("tunaresq-refresh-token", response.data?.tokens.refresh as string);

        dispatch({
          type: AuthActionsTypes.REGISTER,
          payload: { user: response.data?.user as User },
        });
        return { message: response.message, type: "success" };
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



  // const updateUser = useCallback(
  //   async (data: SetupFormData) => {
  //     const nextMonth = addMonths(new Date(), 1);
  //     const { userId, teamName, subscriptionType } = data;
  //     let maxUsers;
  //     let maxProjects;
  //     switch (subscriptionType) {
  //       case "Basic":
  //         maxUsers = 3;
  //         maxProjects = 10;
  //         break;
  //       case "Premium":
  //         maxUsers = 5;
  //         maxProjects = "unlimited";
  //         break;
  //       default:
  //         break;
  //     }

  //     const teamData = await createTeam({
  //       name: teamName,
  //       maxUsers,
  //       maxProjects,
  // createdAt: Timestamp.now(),
  //     });

  //     const updatedData = {
  //       teams: [teamData.id],
  //       subscription: {
  //         expiresIn: nextMonth.toISOString(),
  //         type: subscriptionType,
  //         valid: true,
  //       },
  //     };
  //     const updatedUser = await completeSetup(userId, updatedData);

  //     dispatch({
  //       type: AuthActionsTypes.UPDATEUSER,
  //       payload: updatedUser,
  //     });
  //   },
  //   [authState]
  // );

  const logout = useCallback(async () => {
    await deleteItem("tunaresq-access-token");
    await deleteItem("tunaresq-refresh-token");
    await signOut(auth);

    dispatch({
      type: AuthActionsTypes.LOGOUT,
      payload: null,
    });
  }, []);

  const authCtxValue = useMemo(
    () => ({
      user: authState.user,
      loginWithFacebook,
      loginWithGoogle,
      verifyAccount,
      loginWithTwitter,
      credentialsLogin,
      credentialsSignUp,
      logout,
    }),
    [authState, loginWithFacebook, loginWithGoogle, verifyAccount, loginWithTwitter, credentialsLogin, credentialsSignUp, logout]
  );

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};
