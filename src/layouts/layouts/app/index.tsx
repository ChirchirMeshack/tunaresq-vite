import { Outlet
	// , useLocation
} from "react-router";
// import { useEffect } from "react";
// import { useAuthStore } from "@stores/auth-store";
import { useBusinessStore } from "@stores/business-store";
import WebsiteNavbar from "./navbar";
import AuthGuard from "@components/auth-guard";
import BusinessSelector from "@pages/dashboard/business-selector";
import { handleErrors } from "@lib/handle-errors";
import { useItemStore } from "@stores/item-store";
import { useSalesStore } from "@stores/sales-store";
import { useEffect } from "react";
import { useCustomerStore } from "@stores/customer-store";
// import { useAuthStore } from "@stores/auth-store";
// import { normalizeTimestamp } from "@lib/sales-charts";
// import SubscriptionBlocker from "@components/subscription-blocker";

const AppLayout = () => {
	// const { user } = useAuthStore();
const { fetchItems } = useItemStore();
const { fetchSales } = useSalesStore();
  const { fetchCustomers } = useCustomerStore()
	const { currentBusinessId } = useBusinessStore();
	// const { pathname } = useLocation();
	
  useEffect(() => {
    try {
    if(currentBusinessId) {
		fetchSales(currentBusinessId)
		fetchItems(currentBusinessId);
		fetchCustomers(currentBusinessId)
    }
    } catch (error) {
      handleErrors(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentBusinessId])
	// const expiryDate = normalizeTimestamp(user?.subscriptionStatus.expiresOn).getTime()
    
	return (
		<AuthGuard>
		<main>
			<WebsiteNavbar />
			{
			// (expiryDate !== undefined && new Date().getTime() > expiryDate && !pathname.startsWith("/app/billing")) ? (
			// 	<SubscriptionBlocker />
			// ) : (
				currentBusinessId === null || currentBusinessId === undefined ? (
					<BusinessSelector />
				):(
					<Outlet />
				)

			// )
			}
			
			{/* <WebsiteFooter /> */}
		</main>
		</AuthGuard>
	);
};

export default AppLayout;
