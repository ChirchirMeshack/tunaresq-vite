import {ImageLogo} from "@components/logo"
import { Link } from "@heroui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { LINKS, PATHS } from "config"

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <ImageLogo />
            <p className="text-sm text-gray-500">
              The complete point-of-sale system for small businesses.
            </p>
            <div className="flex space-x-4">
              <Link href={LINKS.facebook} className="text-gray-500 hover:text-primary">
                <Icon icon="lucide:facebook" className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={LINKS.x} className="text-gray-500 hover:text-primary">
                <Icon icon="prime:twitter" className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
              <Link href={LINKS.instagram} className="text-gray-500 hover:text-primary">
                <Icon icon="lucide:instagram" className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={LINKS.linkedin} className="text-gray-500 hover:text-primary">
                <Icon icon="lucide:linkedin" className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-gray-500 hover:text-primary">
                  Features
                </Link>
              </li>
              {/* <li>
                <Link href="#pricing" className="text-sm text-gray-500 hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Integrations
                </Link>
              </li> */}
              <li>
                <Link href={PATHS.terms} className="text-sm text-gray-500 hover:text-primary">
                  Privacy
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Updates
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Help Center
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Tutorials
                </Link>
              </li> */}
              <li>
                <Link href={PATHS.contactUs} className="text-sm text-gray-500 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                  Privacy
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} SellrPOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer