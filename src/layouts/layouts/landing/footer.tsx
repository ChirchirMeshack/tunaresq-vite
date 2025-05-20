import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer className="bg-[#111827] text-white py-12 pb-0 pr-0">
        <div className="container mx-auto px-4 pr-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Left: Logo, text, social links */}
            <div className="flex-1">
              <div className="font-bold text-2xl mb-4">
                <Link to="/" className="flex space-x-2">
                  <img
                    src="/Logo icon vector.svg"
                    alt="TunaResQ Logo"
                    width={25}
                    height={25}
                  />
                  <span className="text-primary">TunaresQ</span>
                </Link>
              </div>
              <p className="text-[#e5e1e1] max-w-md">
                Building a circular giving economy to support Kenyans and Africans in their moments of need.
              </p>
              <div className="mt-6 flex space-x-6">
            <a href="https://www.linkedin.com/company/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-primary transition-colors">
              <Icon icon="simple-icons:linkedin" />
            </a>
            <a href="https://x.com/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-gray-400 hover:text-primary transition-colors">
              <Icon icon="prime:twitter" />
            </a>
            <a href="https://instagram.com/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-primary transition-colors">
              <Icon icon="simple-icons:instagram" />
            </a>
                <a
                  href="https://www.tiktok.com/@tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-primary transition"
                >
                  {/* Lucide TikTok icon */}
                  <Icon icon="simple-icons:tiktok" />
                </a>
              </div>
            </div>
            {/* Right: Group img */}
            <div className="flex justify-end mt-8 md:mt-0 md:ml-8 md:flex-shrink-0 ml-auto">
              <img
                src="/Group.svg"
                alt="radial gradient"
                width={180}
                height={100}
                className="w-40 h-auto md:w-56"
                // priority={false}
              />
            </div>
          </div>
        </div>
      </footer>
  );
};

export default LandingFooter;
