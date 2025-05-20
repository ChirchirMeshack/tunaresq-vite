import { NavLink } from "react-router-dom";
import clsx from "clsx";
// import Logo from "@components/logo";
import { NavItems } from "./config";
import { useState } from "react";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Button } from "@components/ui/button";
import { MenuIcon } from "lucide-react";

interface NavItemsWrapperProps {
  updateDrawer?: () => void;
}

export const NavItemsWrapper = ({ updateDrawer }: NavItemsWrapperProps) => {
  const user = {
    name: "John Doe",
  };
  return (
    <>
      {" "}
      <section className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 lg:gap-[1rem] xl:gap-[2rem]">
        {NavItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "text-base font-medium p-2",
                isActive && " border-b-3 border-primary"
              )
            }
            onClick={() => updateDrawer && updateDrawer()}
            end
          >
            {item.label}
          </NavLink>
        ))}
        {/* <Button
          color="primary"
          radius="full"
          className=" border-2 text-black px-6"
          variant="bordered"
          as={Link}
          href="/contact-us"
          onClick={() => updateDrawer && updateDrawer()}
        >
          Contact Us
        </Button> */}
        {user ? (
          <Button
            color="primary"
            className="px-2 text-white"
            // variant="solid"
            onClick={() => console.log('href={PATHS.dashboard.index')}
          >
            DASHBOARD
          </Button>
        ) : (
          <Button
            color="primary"
            className="px-2 text-black rounded-full"
            variant="outline"
            onClick={() => console.log('href={PATHS.login()')}
          >
            Log In
          </Button>
        )}
      </section>
    </>
  );
};

const LandingNavbar = () => {
  const [shouldShowSidebar, setShowSidebar] = useState<boolean>(false);

  const updateDrawer = () => setShowSidebar((prev) => !prev);

  return (
    <nav className="py-6">
      <section className="container flex justify-between items-center gap-[1rem]">
        {/* <Logo /> */}
        <h6 className="font-semibold text-black text-[2rem]">
          TunaresQ
        </h6>

        <section className="hidden lg:flex lg:items-center">
          <NavItemsWrapper />
        </section>

        {/* Hamburger icon for small screens */}
        <section className="lg:hidden cursor-pointer flex items-center">
          <MenuIcon
            className="text-primary"
            fontSize={40}
            onClick={updateDrawer}
          />
        </section>
      </section>

      <Drawer
        onClose={() => setShowSidebar(false)}
        direction="left"
        open={shouldShowSidebar}
        size={300}
      >
        <section className="px-3 mt-6 flex flex-col gap-2">
          <NavItemsWrapper updateDrawer={updateDrawer} />
        </section>
      </Drawer>
    </nav>
  );
};

export default LandingNavbar;
