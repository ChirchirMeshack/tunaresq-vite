import { type PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import { SnackbarProvider } from "notistack";
import { AuthCtxProvider } from "@contexts/auth/auth-context";


const Providers = ({ children }: PropsWithChildren) => {

	const { pathname } = useLocation();


	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<HelmetProvider>
		<SnackbarProvider
			anchorOrigin={{
				horizontal: "right",
				vertical: "top",
			}}
			autoHideDuration={3000}
			dense
			preventDuplicate
		>
			<AuthCtxProvider>{children}</AuthCtxProvider>
		</SnackbarProvider>
		</HelmetProvider>
	);
};

export default Providers;
