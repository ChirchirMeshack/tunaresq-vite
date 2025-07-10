import { Navigate, useRoutes } from "react-router-dom";
import NotFoundPage from "@pages/not-found";

import HomePage from "@pages/landing-page";
import LandingLayout from "@layouts/landing";
import RegistrationLayout from "@layouts/registration";
// import WelcomePage from "@components/workflows/welcome-page";
// import FundraiserTypePage from "@components/workflows/fundraiserType-page";
import RegistrationPage from "@pages/registration-page";
import SamplePage from "@pages/dashboard-page";
import AuthGuard from "@contexts/auth/auth-guard";

const Router = () => {
	const routes = useRoutes([
		// Landing Pages
		{
			path: "/",
			element: <LandingLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
			],
		},

		//Registration Flow
		{
			path: "auth",
			element: <RegistrationLayout />,
			children: [
				{
					index: true,
					element: <Navigate to="/auth/register" replace />,
				},
				{
					path: "register",
					element: <RegistrationPage />,
				},
			],
		},
		// Dashboard
		{
			path: "dashboard",
			element: <AuthGuard><SamplePage /></AuthGuard>,
		},

		// not found page
		{
			path: "*",
			element: <NotFoundPage />,
		},
	]);

	return routes;
};

export default Router;
