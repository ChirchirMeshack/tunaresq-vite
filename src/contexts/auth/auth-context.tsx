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
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  // onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth, googleAuthProvider, facebookAuthProvider, twitterAuthProvider } from "@lib/firebase";
import { SignUpFormData } from "@components/workflows/Signup-page/validation"
import { USER as User } from "types/user";

export const AuthContext = createContext<AuthCtx | null>(null);

const defaultAuthState: AuthState = {
  user: null,
  isAdmin: false,
  dashboardStats: {
    teams: 0,
    projects: 0,
  },
};


const authReducer = (state: AuthState, action: AuthActions) => {
  const { payload, type } = action;

  switch (type) {
    case AuthActionsTypes.LOGIN:
      return {
        ...state,
        user: payload.user,
        isAdmin: payload.isAdmin,
      };

    case AuthActionsTypes.REGISTER:
      return {
        ...state,
        user: payload.user,
        isAdmin: payload.isAdmin,
      };

    case AuthActionsTypes.UPDATEUSER:
      return { ...state, user: payload };

    case AuthActionsTypes.LOGOUT:
      return { ...state, user: null };

    case AuthActionsTypes.UPDATEDASHBOARDSTATS:
      return { ...state, dashboardStats: payload };

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
  //         const statsData = await getUserStats(loginResp.id);
  //         dispatch({
  //           type: AuthActionsTypes.UPDATEDASHBOARDSTATS,
  //           payload: statsData,
  //         });
  //         dispatch({
  //           type: AuthActionsTypes.LOGIN,
  //           payload: { user: loginResp, isAdmin: loginResp.role === "Admin" },
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
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        storeItem("tunaresq-token", token);
      }

      const user = result.user;
      alert(JSON.stringify(user));
      // const loginResp = await getLoggedInUserData(user.uid);
      const loginResp = "User details not found"

      if (loginResp === "User details not found") {
        return {
          message: "No account found. Please sign up first.",
          type: "error",
        };
      } else {
        dispatch({
          type: AuthActionsTypes.LOGIN,
          payload: { user: loginResp, isAdmin: true },
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
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        storeItem("tunaresq-token", token);
      }

      const user = result.user;
      alert(JSON.stringify(user));
      // const loginResp = await getLoggedInUserData(user.uid);
      const loginResp = "User details not found"

      if (loginResp === "User details not found") {
        return {
          message: "No account found. Please sign up first.",
          type: "error",
        };
      } else {
        dispatch({
          type: AuthActionsTypes.LOGIN,
          payload: { user: loginResp, isAdmin: true },
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
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        storeItem("tunaresq-token", token);
      }

      const user = result.user;
      alert(JSON.stringify(user));
      // const loginResp = await getLoggedInUserData(user.uid);
      const loginResp = "User details not found"

      if (loginResp === "User details not found") {
        return {
          message: "No account found. Please sign up first.",
          type: "error",
        };
      } else {
        dispatch({
          type: AuthActionsTypes.LOGIN,
          payload: { user: loginResp, isAdmin: true },
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
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (!user) {
        return {
          message: "No account found. Please sign up first.",
          type: "error",
        };
      }
      // const loginResp = await getLoggedInUserData(user.uid);
      // const isAdmin = loginResp.role === "Admin";
      const statsData = {
        teams: 0,
        projects: 0,
      }
      dispatch({
        type: AuthActionsTypes.UPDATEDASHBOARDSTATS,
        payload: statsData,
      });
      dispatch({
        type: AuthActionsTypes.LOGIN,
        payload: { user: {
          id: "1",
          firstname: "loginResp.name",
          lastname: "loginResp.name",
          email_address: "loginResp.email",
          profile_photo: "loginResp.photoURL",
          createdAt: new Date(),
          status: "approved",
          country_code: "",
          mobile_number: "",
          updatedAt: new Date()
        }, isAdmin: true },
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
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email_address,
          data.password
        );
        const userData = {
          id: user.uid,
          firstname: user.displayName?.split(" ")[0],
          lastname: user.displayName?.split(" ")[1],
          email_address: user.email,
          profile_photo: user.photoURL || null,
          status: "approved",
          country_code: user.phoneNumber?.slice(0, 3) || "",
          mobile_number: user.phoneNumber?.slice(0, 3) || "",
        };

        // const response = await saveUserData(userData);
        const response = {
          user: userData
        }
        dispatch({
          type: AuthActionsTypes.REGISTER,
          payload: { user: response.user as User, isAdmin: true },
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
    await deleteItem("tunaresq-token");
    await signOut(auth);

    dispatch({
      type: AuthActionsTypes.LOGOUT,
      payload: null,
    });
  }, []);

  const authCtxValue = useMemo(
    () => ({
      user: authState.user,
      isAdmin: authState.isAdmin,
      loginWithFacebook,
      loginWithGoogle,
      loginWithTwitter,
      credentialsLogin,
      credentialsSignUp,
      logout,
      dashboardStats: authState.dashboardStats,
    }),
    [authState, loginWithFacebook, loginWithGoogle, loginWithTwitter, credentialsLogin, credentialsSignUp, logout]
  );

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};
