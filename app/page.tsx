"use client"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HandHeart, Handshake, PackageOpen } from "lucide-react"
import WaitlistForm from "@/components/waitlist-form"
import EmailWaitlistForm from "@/components/EmailWaitlistForm"
import { MainNav } from "@/components/MainNav"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffbf7]">
      {/* Header */}
   <MainNav />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#111827] mt-5 mb-4">
            Connecting Hearts,
            <br />
            <span className="text-[#f97343]">Transforming Lives</span>
          </h1>
          <p className="text-[#3f4550] mb-8 max-w-2xl mx-auto">
            TunaResQ connects those in need with those who can help, creating a circular giving economy for Africans to
            support each other with fundraising, donations and volunteering.
          </p>
          <div className="max-w-md mx-auto">
            <EmailWaitlistForm />
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <Image
            src="/Hero image.svg"
            alt="Hero illustration"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* Our Approach */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8">
          <span className="text-[#f97343] text-sm font-bold">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#111827] mt-2">
        A Platform To Find and Give
        <br />
        Support in Times of Need
          </h2>
          <p className="text-[#3f4550] max-w-2xl mx-auto mt-4">
        We're building a platform where Africans can find support for essential needs. We are creating a sustainable
        cycle of giving and receiving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
        {
          title: "Fundraising Campaigns",
          icon: <HandHeart />,
          description:
            "Create and support fundraising campaigns for medical bills, school fees, or any essential need.",
        },
        {
          title: "Donate Items",
          icon: <Handshake />,
          description:
            "Donate clothing, food, and essential items directly to people in need, creating a circular economy of giving.",
        },
        {
          title: "Find Volunteer Opportunities",
          icon: <PackageOpen />,
          description: "Find meaningful volunteer opportunities with vetted NGOs and charities across Africa.",
        },
          ].map((item, i) => (
        <div
          key={i}
          className="text-center p-6 rounded-2xl border border-[#e5e1e1] bg-white shadow-sm transition hover:shadow-md"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="w-12 h-12 bg-[#fffbf7] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e5e1e1] text-[#f97343]">
            {item.icon}
          </div>
          <h3 className="font-bold text-xl mb-2 text-[#111827]">{item.title}</h3>
          <p className="text-[#3f4550]">{item.description}</p>
        </div>
          ))}
        </div>
      </section>

      {/* Essential Needs */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <span className="text-[#f97343] text-sm font-bold">A Safe Space to Find Help</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#111827] mt-2">For Your Essential Needs</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
        {
          label: "Medical Support",
          image: "/images/stethoscope.png",
          alt: "Stethoscope icon",
        },
        {
          label: "School Fees",
          image: "/images/graduation-cap.png",
          alt: "Graduation cap icon",
        },
        {
          label: "Food & Clothing",
          image: "/images/salad-bowl.png",
          alt: "Salad bowl icon",
        },
        {
          label: "Shelter and Safe Houses",
          image: "/images/building.png",
          alt: "Building icon",
        },
        {
          label: "Job Opportunities",
          image: "/images/job-offer.png",
          alt: "Job offer icon",
        },
        {
          label: "Mental Health Support",
          icon: (
            // Brain (Lucide)
            <svg width="40" height="40" fill="none" stroke="#111827" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
              <path d="M6 18a4 4 0 0 1-1.967-.516"/>
              <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
            </svg>
          ),
        },
          ].map((item, i) => (
        <div
          key={i}
          className="p-4 text-center border border-[#e5e1e1] rounded-lg bg-[#fff] flex flex-col items-center"
        >
          <div className="mb-2 text-[#f97343] flex items-center justify-center h-14 w-14">
            {item.image ? (
          <Image
            src={item.image}
            alt={item.alt}
            width={40}
            height={40}
            className="object-contain w-10 h-10 md:w-12 md:h-12"
          />
            ) : (
          item.icon
            )}
          </div>
          <p className="text-[#3f4550] font-medium">{item.label}</p>
        </div>
          ))}
        </div>
      </section>

      {/* How TunaresQ Works */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#111827] text-center mb-12">
        How TunaResQ Works
          </h2>

          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 items-center">
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            1
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#111827]">Create Your Fundraiser or Item Request</h3>
          </div>
          <p className="text-[#3f4550] font-weight-400 text-size-16">
            Create a fundraising campaign or item request, sharing your story and what you need help with.
          </p>
        </div>
        <div className="relative h-56 md:h-64 rounded-lg overflow-hidden">
          <Image
            src="/Step 1 image.svg"
            alt="Create profile illustration"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
          </div>
          <div className="my-8">
              <hr className="border-t border-gray-300" />
            </div> {/* Line break */}

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 items-center">
        <div className="relative h-56 md:h-64 rounded-lg overflow-hidden order-last md:order-first">
          <Image
            src="/Step 2 image.svg"
            alt="Browse stories illustration"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            2
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#111827]">Donate items or Contribute to fundraiser</h3>
          </div>
          <p className="text-[#3f4550]">
            As a donor,you can browse verified campaigns and choose to give through financial
            contributions or by donating physical items.
          </p>
        </div>
          </div>
          <div className="my-8">
              <hr className="border-t border-gray-300" />
            </div> {/* Line break */}

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 items-center">
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            3
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#111827]">Connect With Supporters</h3>
          </div>
          <p className="text-[#3f4550]">
            Create a fundraising campaign or item request, sharing your story and what you need help with.
            We will help you amplify your request and mobilize help.
          </p>
        </div>
        <div className="relative h-56 md:h-64 rounded-lg overflow-hidden">
          <Image
            src="/Step 3 image.svg"
            alt="Connect with supporters illustration"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
          </div>
          <div className="my-8">
              <hr className="border-t border-gray-300" />
            </div> {/* Line break */}

          {/* Step 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative h-56 md:h-64 rounded-lg overflow-hidden order-last md:order-first">
          <Image
            src="/Step 4 image.svg"
            alt="Give and receive support illustration"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            4
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[#111827]">Receive Support & Contributions</h3>
          </div>
          <p className="text-[#3f4550]">
            Receive financial contributions or physical items from donors directly,with all transactions handled securely.Update supporters on how their help has made a diffrence,completing the circle of support
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="relative" id="waitlist">
        <div className="absolute inset-0">
          <Image
            src="/images/waitlist-background.jpg"
            alt="Community members supporting each other"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#111827]/70"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12 pb-0 pr-0">
        <div className="container mx-auto px-4 pr-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Left: Logo, text, social links */}
            <div className="flex-1">
              <div className="font-bold text-2xl mb-4">
                <Link href="/" className="flex space-x-2">
                  <Image
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
            {/* Right: Group image */}
            <div className="flex justify-end mt-8 md:mt-0 md:ml-8 md:flex-shrink-0">
              <Image
                src="/Group.svg"
                alt="radial gradient"
                width={180}
                height={100}
                className="w-40 h-auto md:w-56"
                priority={false}
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
