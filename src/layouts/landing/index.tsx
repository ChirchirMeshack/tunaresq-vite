import { Outlet} from "react-router-dom";
import LandingFooter from "../layouts/landing/footer";
 import { MainNav } from "@components/MainNav"
//import Header from "../layouts/landing/header";

const LandingLayout = () => {
  // const { pathname } = useLocation();
  return (
    <main className="min-h-screen bg-[#fffbf7]">
      {/* Header */}
      {/* <Header /> */}
      <MainNav />

      {/* content */}
        <Outlet />

      {/* footer */}

      <LandingFooter />
    </main>
  );
};

export default LandingLayout;
