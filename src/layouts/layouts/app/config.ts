import { PATHS } from "config";

export const MENU_ITEMS = [
	{
		label: "Stats",
		href: PATHS.dashboard,
	},
	{
		label: "Sales",
		href: PATHS.sales.mode,
	},
	{
		label: "Reports",
		href: PATHS.reports.list,
	},
	{
		label: "Customers",
		href: PATHS.customers.list,
	},
	{
		label: "Inventory",
		href: PATHS.inventory.list,
	},
	{
		label: "Partners",
		href: PATHS.partners.list,
	},
	{
		label: "Account",
		href: PATHS.account.hub,
	},
];
