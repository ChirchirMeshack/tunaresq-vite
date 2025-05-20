import { Outlet} from "react-router-dom";
import LandingFooter from "./footer";
import Header from "./header";

const LandingLayout = () => {
  return (
    <main className="min-h-screen bg-[#fffbf7]">
      <Header /> 
      {/* content */}
        <Outlet />
      {/* footer */}
      <LandingFooter />
    </main>
  );
};

export default LandingLayout;
