import { PropsWithChildren } from "react";
import useAuthCtx from "./use-auth";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "config";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAuthCtx();

  const { pathname, search } = useLocation();

  if (!user) {
    return <Navigate to={PATHS.login(search ? pathname + search : pathname)} />;
  }

  return children;
};

export default AuthGuard;
