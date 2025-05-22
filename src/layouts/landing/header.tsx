import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@components/ui/button";
import { MenuIcon } from "lucide-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { cn } from "@lib/utils";

interface NavItemsWrapperProps {
  updateDrawer?: () => void;
}

/**
 * List of navigation items used across the navbar.
 * These links scroll to sections within the landing page.
 */
const NavItems = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#our-offerings", label: "Our Offerings" },
  { href: "#about", label: "About Us" },
  // Extendable for additional nav links
];

/**
 * Wrapper for navigation links.
 * Used inside both desktop and mobile menus.
 */
export const NavItemsWrapper = ({ updateDrawer }: NavItemsWrapperProps) => {
  const user = {
    name: "John Doe", // Replace with actual user context if available
  };

  return (
    <section className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 lg:gap-[1rem] xl:gap-[2rem] mx-0">
      {NavItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.href}
          className={({ isActive }) =>
            clsx(
              "text-base font-medium p-2",
              isActive && "border-b-3 border-primary"
            )
          }
          onClick={() => updateDrawer && updateDrawer()}
          end
        >
          {item.label}
        </NavLink>
      ))}

      {/* CTA Button for mobile*/}
     
          <Button
            onClick={() =>
              document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 text-sm"
          >
            Join The Waitlist
          </Button>
      
    </section>
  );
};

/**
 * Main landing page navbar.
 * Includes scroll-based style change, desktop & mobile responsiveness.
 */
const LandingNavbar = () => {
  const [shouldShowSidebar, setShowSidebar] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { pathname } = useLocation();

  /**
   * Toggle the drawer (mobile sidebar)
   */
  const updateDrawer = () => setShowSidebar((prev) => !prev);

  /**
   * Add scroll event listener to modify navbar styling
   * when the user scrolls down the page.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-auto mx-4",
        isScrolled
          ? "bg-[#fffbf7]/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/Logo icon vector.svg" // Logo path (unchanged)
            alt="TunaResQ Logo"
            width={25}
            height={25}
          />
          <span className="font-bold text-2xl text-[#f97343]">TunaresQ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ 
                      behavior: "smooth",
                      block: "start"
                    });
                  }
                }}
              className=
                "text-sm font-medium transition-colors hover:text-[#f97343]"
            >
              {item.label}
            </a>
          ))}
        </nav> 
          
        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            onClick={() =>
              document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6 text-sm"
          >
            Join The Waitlist
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <section className="lg:hidden cursor-pointer flex items-center">
          <MenuIcon className="text-primary" fontSize={40} onClick={updateDrawer} />
        </section>
      </div>

      {/* Mobile Drawer Navigation */}
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
  );
};

export default LandingNavbar;
