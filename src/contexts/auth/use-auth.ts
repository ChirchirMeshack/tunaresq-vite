import { useContext } from "react";
import { AuthContext } from "./auth-context";

const useAuthCtx = () => {
	const authCtx = useContext(AuthContext);

	if (!authCtx) {
		throw new Error("useAuthCtx should be used inside AuthCtxProvider");
	}

	return authCtx;
};

export default useAuthCtx;
