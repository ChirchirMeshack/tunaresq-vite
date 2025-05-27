import { NavLink, Link } from "react-router-dom";
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
  { href: "#how-it-works", label: "How TunaresQ Works" },
  { href: "#our-offerings", label: "Our Offerings" },
  { href: "#about", label: "About Us" },
  // Extendable for additional nav links
];
/**
 * Wrapper for navigation links.
 * Used inside both desktop and mobile menus.
 */
export const NavItemsWrapper = ({ updateDrawer }: NavItemsWrapperProps) => {
  return (
    <section className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 lg:gap-[1rem] xl:gap-[2rem] mx-auto">
      {NavItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.href}
          className={({ isActive }) =>
            clsx(
              "text-base font-medium p-2 ",
              isActive && "border-b-1 border-primary"
            )
          }
          onClick={(e) => {
            e.preventDefault();
            const targetId = item.href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
              });
              // Close the drawer after clicking
              if (updateDrawer) {
                updateDrawer();
              }
            }
          }}
          end
        >
          {item.label}
        </NavLink>
      ))}

      {/* CTA Button for mobile*/}
      <Button
        onClick={() => {
          document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
          // Close the drawer after clicking
          if (updateDrawer) {
            updateDrawer();
          }
        }}
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
        " fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-auto",
        isScrolled
          ? "bg-[#fffbf7]/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto px-4 md:px-12 lg:px-24 flex py-3 md:py-5 items-center justify-between">
        {/* Logo and Brand Name */} 
        <Link to="/" className="">
          <img
            src="/TunaresQ logo.svg" // Logo path (unchanged)
            alt="TunaresQ Logo"
            width={96}
            height={96}
            className="w-1/2 md:w-3/4"
          />
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex md:pr-24 text-[#111827] space-x-6">
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
        <div className="hidden lg:flex items-center space-x-4">
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
      <hr className="shadow-md border-1"/>
    </header>
    
  );
};

export default LandingNavbar;
