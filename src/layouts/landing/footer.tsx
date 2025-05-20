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
                  <span className="text-[#f97343]">TunaresQ</span>
                </Link>
              </div>
              <p className="text-[#e5e1e1] max-w-md">
                Building a circular giving economy to support Kenyans and Africans in their moments of need.
              </p>
              <div className="mt-6 flex space-x-6">
                <a
                  href="https://www.linkedin.com/company/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#f97343] transition"
                >
                  {/* Lucide LinkedIn icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2"/>
                    <path d="M7 8v8" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="7" cy="6.5" r="1" strokeWidth="2"/>
                    <path d="M11 12v4m0-4a2 2 0 1 1 4 0v4m0-4v-1a2 2 0 0 1 4 0v5" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="hover:text-[#f97343] transition"
                >
                  {/* Lucide X icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2"/>
                    <path d="M7 7l10 10M17 7L7 17" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#f97343] transition"
                >
                  {/* Lucide Instagram icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="6" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="5" strokeWidth="2"/>
                    <circle cx="17" cy="7" r="1.2" strokeWidth="2"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@tunaresq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-[#f97343] transition"
                >
                  {/* Lucide TikTok icon */}
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2"/>
                    <path d="M16 8.5V13a4 4 0 1 1-4-4" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 8.5c1.5 0 3 1 4 1" strokeWidth="2" strokeLinecap="round"/>
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
