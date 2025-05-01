"use client"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HandHeart, Handshake, PackageOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffbf7]">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-[#f97343] font-bold text-2xl">TunaResQ</div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8">
            <a href="#how-it-works" className="text-[#3f4550] hover:text-[#f97343]">
              How It Works
            </a>
            <a href="#about" className="text-[#3f4550] hover:text-[#f97343]">
              About Us
            </a>
          </nav>
          <Button onClick={() => {
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
      }} className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6">Join The Waitlist</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#111827] mb-4">
            Connecting Hearts,
            <br />
            <span className="text-[#f97343]">Transforming Lives</span>
          </h1>
          <p className="text-[#3f4550] mb-8 max-w-2xl mx-auto">
            TunaResQ connects those in need with those who can help, creating a circular giving economy for Africans to
            support each other with fundraising, donations and volunteering.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="rounded-full border-[#e5e1e1]" />
            <Button className="bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full px-6">Join The Waitlist</Button>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-[120px] md:w-[150px] h-[180px] md:h-[220px] rounded-[40px] overflow-hidden">
              <Image
                src={`/images/gallery-${i}.jpg`}
                alt={`Community member ${i}`}
                width={150}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
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

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
            <div key={i} className="text-center p-6 rounded-lg">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            "Medical Support",
            "School Fees",
            "Food & Clothing",
            "Shelter and Safe Houses",
            "Job Opportunities",
            "Mental Health Support",
          ].map((item, i) => (
            <div key={i} className="p-4 text-center border border-[#e5e1e1] rounded-lg">
              <p className="text-[#3f4550] font-medium">{item}</p>
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
          <div className="bg-[#fff8f2] rounded-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#111827] mb-4 text-center">
              Join Our Waitlist
            </h2>
            <p className="text-[#3f4550] mb-6 text-center">
              Be the first to know when we launch and get early access to our platform. Join our waitlist to stay
              updated.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#3f4550] mb-1">
                  Full Name *
                </label>
                <Input id="fullName" placeholder="Enter your name" className="rounded-lg border-[#e5e1e1]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#3f4550] mb-1">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="rounded-lg border-[#e5e1e1]"
                />
              </div>
              <Button className="w-full bg-[#f97343] hover:bg-[#cf3c07] text-white rounded-full">
                JOIN THE WAITLIST
              </Button>
            </form>
          </div>
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
