import { type PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import { SnackbarProvider } from "notistack";


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
			{children}
		</SnackbarProvider>
		</HelmetProvider>
	);
};

export default Providers;
