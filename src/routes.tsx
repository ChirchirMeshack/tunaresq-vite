import { useRoutes } from "react-router-dom";
import NotFoundPage from "@pages/not-found";

import HomePage from "@pages/landing-page";

import LandingLayout from "@layouts/landing";

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

		// not found page
		{
			path: "*",
			element: <NotFoundPage />,
		},
	]);

	return routes;
};

export default Router;
