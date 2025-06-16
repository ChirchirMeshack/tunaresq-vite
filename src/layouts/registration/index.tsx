import { Outlet} from "react-router-dom";
import Progress from "./progress";
import Header from "./header";

const RegistrationLayout = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  return (
    <>
      {/* Header */}
      <Header isLoggedIn={false} logout={handleLogout} /> 

      {/* Progress Indicator */}
      <Progress currentStep={1} />

      {/* content */}
        <Outlet />
    </>
  );
};

export default RegistrationLayout;
