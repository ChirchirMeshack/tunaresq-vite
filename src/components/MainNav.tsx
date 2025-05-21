import * as React from "react"
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { Link, useLocation } from "react-router-dom"

/**
 * Navigation item structure
 * @typedef {Object} NavItem
 * @property {string} href - The target URL or anchor
 * @property {string} label - Display text for the navigation item
 */
interface NavItem {
  href: string
  label: string
}

/**
 * MainNav Component
 *
 * A responsive navigation header with the following features:
 * - Transparent to solid background transition on scroll
 * - Mobile-friendly hamburger menu
 * - Animated logo
 * - Responsive navigation links
 * - Join Waitlist button
 *
 * @returns {JSX.Element} The rendered navigation component
 */
export function MainNav() {
  // Get current pathname for active link highlighting
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  // State management
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  /**
   * Scroll handler effect
   * Updates header background based on scroll position
   */
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /**
   * Navigation items configuration
   * Centralized array of navigation links
   */
  const navItems: NavItem[] = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#our-offerrings", label: "Our Offering" },
    { href: "#about", label: "About Us" },
    
    // Add more navigation items as needed
  ];

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
          {navItems.map((item) => (
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
        <div className="flex md:hidden items-center space-x-4">
          {/*<ModeToggle />*/} {/* Keep or remove dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon */}
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
            {/* Close Icon */}
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
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="container py-4 flex flex-col space-y-4 bg-[#fffbf7]/95 backdrop-blur-md"> {/* Use your background color */}
          {/* Mobile Navigation Links */}
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
          {/* Mobile Action Buttons */}
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
      </div>
    </header>
  )
}