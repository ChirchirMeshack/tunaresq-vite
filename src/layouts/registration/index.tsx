import { Outlet} from "react-router-dom";
import Progress from "./progress";
import Header from "./header";

const RegistrationLayout = () => {
  // const { pathname } = useLocation();
  return (
    <>
      {/* Header */}
      <Header /> 

      {/* Progress Indicator */}
      <Progress />

      {/* content */}
        <Outlet />
    </>
  );
};

export default RegistrationLayout;
