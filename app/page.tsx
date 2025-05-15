"use client"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HandHeart, Handshake, PackageOpen } from "lucide-react"
import WaitlistForm from "@/components/waitlist-form"
import EmailWaitlistForm from "@/components/EmailWaitlistForm"
import { MainNav } from "@/components/MainNav"

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

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#111827] text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f97343] text-white flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div className="border border-[#e5e1e1] rounded-lg p-6 h-full">
              <h3 className="font-bold text-xl mb-3 text-[#111827]">Join the Waitlist</h3>
              <p className="text-[#3f4550]">
                Be among the first to make an impact by joining our waitlist! Sign up with your email to secure your
                spot and get exclusive early access to our platform. Once we launch, you'll be ready to start donating
                or receiving essentials, helping to build a stronger, more connected community.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f97343] text-white flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div className="border border-[#e5e1e1] rounded-lg p-6 h-full">
              <h3 className="font-bold text-xl mb-3 text-[#111827]">Get Notified and Prepare</h3>
              <p className="text-[#3f4550]">
                Excited for what's coming? We'll keep you updated! You'll receive a notification via email when TunaResQ
                officially launches or when your spot is ready. This is the perfect time to think about what you'd like
                to donate or prepare a list of essentials your family needs, so you're all set to hit the ground running
                when you gain access.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f97343] text-white flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div className="border border-[#e5e1e1] rounded-lg p-6 h-full">
              <h3 className="font-bold text-xl mb-3 text-[#111827]">Get Matched with a Real Need</h3>
              <p className="text-[#3f4550]">
                Be among the first to make an impact by joining our waitlist! Sign up with your email to secure your
                spot and get exclusive early access to our platform. Once we launch, you'll be ready to start donating
                or receiving essentials, helping to build a stronger, more connected community.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f97343] text-white flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div className="border border-[#e5e1e1] rounded-lg p-6 h-full">
              <h3 className="font-bold text-xl mb-3 text-[#111827]">Give with Confidence</h3>
              <p className="text-[#3f4550]">
                Be among the first to make an impact by joining our waitlist! Sign up with your email to secure your
                spot and get exclusive early access to our platform. Once we launch, you'll be ready to start donating
                or receiving essentials, helping to build a stronger, more connected community.
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
      <footer className="bg-[#111827] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="font-bold text-2xl mb-4">
            <span className="text-white">TunaRes</span>
            <span className="text-[#f97343]">Q</span>
          </div>
          <p className="text-[#e5e1e1] max-w-md">
            Building a circular giving economy to support Kenyans and Africans in their moments of need.
          </p>
        </div>
      </footer>
    </main>
  )
}
