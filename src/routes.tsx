import { Navigate, useRoutes } from "react-router-dom";
import NotFoundPage from "@pages/not-found";

import RegistrationLayout from "@layouts/registration";
import RegistrationPage from "@pages/registration";
import SamplePage from "@pages/dashboard";
import AuthGuard from "@contexts/auth/auth-guard";
import OnboardingFlow from "@pages/onboarding";

const Router = () => {
	const routes = useRoutes([
		// Landing Pages
		{
			path: "/",
			element: <RegistrationLayout />,
			children: [
				{
					index: true,
					element: <OnboardingFlow />,
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
