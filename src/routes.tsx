import { useRoutes } from "react-router-dom";
import NotFoundPage from "@pages/not-found";

import HomePage from "@pages/landing-page";
import LandingLayout from "@layouts/landing";
import RegistrationLayout from "@layouts/registration";
import WelcomePage from "@pages/welcome-page";

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
			path: "/register",
			element: <RegistrationLayout />,
			children: [
				{
					index: true,
					element: <WelcomePage />,
				},
			],
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
