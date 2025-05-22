import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react"

const LandingFooter = () => {
  return (
    <footer className="bg-[#111827] text-white py-12 pb-0 pr-0">
        <div className="container mx-auto mx-4 pr-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Left: Logo, text, social links */}
            <div className="flex-1">
              <div className="font-bold text-2xl mb-4 px-4">
                <Link to="/" className="flex space-x-2">
                  <img
                    src="/Logo icon vector.svg"
                    alt="TunaResQ Logo"
                    width={25}
                    height={25}
                  />
                  <span className="text-[#f97343]">TunaresQ</span>
                </Link>
              </div>
              <p className="text-[#e5e1e1] max-w-md px-4">
                Building a circular giving economy to support Kenyans and Africans in their moments of need.
              </p>
              <div className="mt-6 flex space-x-6 px-4">
                <a
                  href="https://www.linkedin.com/company/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#f97343] transition"
                >
                  <Linkedin size={28} strokeWidth={2} />
                </a>
                <a
                  href="https://x.com/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="hover:text-[#f97343] transition"
                >
                  <Twitter size={28} strokeWidth={2} />
                </a>
                <a
                  href="https://instagram.com/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#f97343] transition"
                >
                  <Instagram size={28} strokeWidth={2} />
                </a>
                <a
                  href="https://www.tiktok.com/@tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-[#f97343] transition"
                >
                  {/* TikTok SVG icon */}
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path
                        d="M34.5 6c0 4.97 4.03 9 9 9v6.75c-3.41 0-6.61-1.09-9.19-2.94V32c0 6.63-5.37 12-12 12s-12-5.37-12-12 5.37-12 12-12c.41 0 .81.02 1.21.06V26.1c-.4-.07-.8-.1-1.21-.1-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6V3h6.19C34.5 3 34.5 6 34.5 6Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            {/* Right: Group img */}
            <div className="flex justify-end mt-8 md:mt-0 md:ml-8 md:flex-shrink-0">
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
