import { PropsWithChildren } from "react";
import useAuthCtx from "./use-auth";
import { Navigate, useSearchParams } from "react-router-dom";
import { PATHS } from "config";

const GuestGuard = ({ children }: PropsWithChildren) => {
	const { user } = useAuthCtx();

	const [searchParams] = useSearchParams();

	const redirect = searchParams.get("redirect");

	if (user) {
		return <Navigate to={redirect ?? PATHS.dashboard.index} />;
	}

	return children;
};

export default GuestGuard;
