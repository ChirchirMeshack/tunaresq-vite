import { useRoutes } from "react-router-dom";
import NotFoundPage from "@pages/not-found";

import HomePage from "@pages/landing-page";
import LandingLayout from "@layouts/landing";
import RegistrationLayout from "@layouts/registration";
// import WelcomePage from "@components/workflows/welcome-page";
// import FundraiserTypePage from "@components/workflows/fundraiserType-page";
import RegistrationPage from "@pages/registration-page";

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
			path: "/auth",
			element: <RegistrationLayout />,
			children: [
				{
					index: true,
					element: <RegistrationPage />,
				},
			],
		},
		// {
		// 	path: "/register",
		// 	element: <RegistrationLayout />,
		// 	children: [
		// 		{
		// 			index: true,
		// 			element: <WelcomePage />,
		// 		},
		// 	],
		// },
		// {
		// 	path: "/register/fundraiser-type",
		// 	element: <RegistrationLayout />,
		// 	children: [
		// 		{
		// 			index: true,
		// 			element: <FundraiserTypePage />,
		// 		},
		// 	],
		// },

		// not found page
		{
			path: "*",
			element: <NotFoundPage />,
		},
	]);

	return routes;
};

export default Router;
