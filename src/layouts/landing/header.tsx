import { NavLink } from "react-router-dom";
import clsx from "clsx";
// import TheBandLogo from "@components/logo";
import { useState, useEffect } from "react";
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { Link, useLocation } from "react-router-dom"

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { MenuIcon } from "lucide-react";

interface NavItemsWrapperProps {
  updateDrawer?: () => void;
}

  /**
   * Navigation items configuration
   * Centralized array of navigation links
   */
  const NavItems: {
  href: string
  label: string
}[] = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#about", label: "About Us" },
    // Add more navigation items as needed
  ];
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
            to={item.href}
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
  // Get current pathname for active link highlighting
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  // State management
  const [isScrolled, setIsScrolled] = useState(false)

  /**
   * Scroll handler effect
   * Updates header background based on scroll position
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[#fffbf7]/80 backdrop-blur-md shadow-sm" : "bg-transparent", // Use your background color
      )}
    >
      {/* Main Navigation Container */}
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/Logo icon vector.svg" // Path to your logo
            alt="TunaResQ Logo"
            width={25}   // Adjust size as needed
            height={25}  // Adjust size as needed
          />
          <span className="font-bold text-2xl text-[#f97343]">TunaResQ</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {NavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#f97343]", // Use your hover color
                pathname === item.href ? "text-[#111827]" : "text-[#3f4550]", // Use your text colors
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/*<ModeToggle />*/} {/* Keep or remove dark mode toggle */}
          <Button
            onClick={() => {
              document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 text-sm" // Adjusted font size
          >
            Join The Waitlist
          </Button>
        </div>

        {/* Mobile Menu Controls */}
        {/* <div className="flex md:hidden items-center space-x-4">
          {/*<ModeToggle />*/} {/* Keep or remove dark mode toggle *}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon *}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isMobileMenuOpen ? "hidden" : "block")}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {/* Close Icon *}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isMobileMenuOpen ? "block" : "hidden")}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div> */}
        
        {/* Hamburger icon for small screens */}
        <section className="lg:hidden cursor-pointer flex items-center">
          <MenuIcon
            className="text-primary"
            fontSize={40}
            onClick={updateDrawer}
          />
        </section>
      </div>

      {/* Mobile Navigation Menu */}
      {/* <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="container py-4 flex flex-col space-y-4 bg-[#fffbf7]/95 backdrop-blur-md"> {/* Use your background color */}
          {/* Mobile Navigation Links *}
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#f97343] py-2", // Use your hover color
                pathname === item.href ? "text-[#111827]" : "text-[#3f4550]", // Use your text colors
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile Action Buttons *}
          <div className="flex flex-col space-y-2 pt-2">
            <Button
              onClick={() => {
                document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 text-sm" // Adjusted font size
            >
              Join The Waitlist
            </Button>
          </div>
        </div>
      </div> */}
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
    </header>
    //   <section className="container flex justify-between items-center gap-[1rem]">
    //     {/* <TheBandLogo /> */}
    //     <Subtitle className="font-semibold text-black text-[2rem]">
    //       Confomap
    //     </Subtitle>

    //     <section className="hidden lg:flex lg:items-center">
    //       <NavItemsWrapper />
    //     </section>

    //   </section>
  );
};

export default LandingNavbar;
