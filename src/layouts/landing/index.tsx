import { Outlet} from "react-router-dom";
import LandingFooter from "./footer";
// import { MainNav } from "@components/MainNav"
import Header from "./header";

const LandingLayout = () => {
  // const { pathname } = useLocation();
  return (
    <>
      {/* Header */}
      <Header /> 
   {/* <MainNav /> */}

      {/* content */}
        <Outlet />

      {/* footer */}

      <LandingFooter />
    </>
  );
};

export default LandingLayout;
