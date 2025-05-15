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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#111827] mb-4">
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
      <section className="container mx-auto px-4 py-8">
  <div className="flex justify-center items-center">
    {/* Using different heights for the capsule images to match the Figma design */}
    <div className="relative flex space-x-2"> {/* Replaced -space-x with space-x */}
      {[1, 2, 3, 4, 5].map((i) => {
        // Define the dimensions for each image
        let containerClasses
        let width
        let height

        switch (i) {
          case 1:
            containerClasses = "w-[80px] md:w-[120px] h-[160px] md:h-[240px]"
            width = 200 // Example width
            height = 340 // Example height
            break
          case 2:
            containerClasses = "w-[90px] md:w-[130px] h-[180px] md:h-[280px]"
            width = 206 // Example width
            height = 400 // Example height
            break
          case 3:
            containerClasses = "w-[100px] md:w-[150px] h-[200px] md:h-[320px]"
            width = 250 // Example width
            height = 460 // Example height
            break
          case 4:
            containerClasses = "w-[90px] md:w-[130px] h-[180px] md:h-[280px]"
            width = 205 // Example width
            height = 400 // Example height
            break
          case 5:
            containerClasses = "w-[80px] md:w-[120px] h-[160px] md:h-[240px]"
            width = 200 // Example width
            height = 340 // Example height
            break
          default:
            containerClasses = "w-[80px] md:w-[120px] h-[160px] md:h-[240px]"
            width = 200 // Example width
            height = 340 // Example height
        }

        return (
          <div
            key={i}
            className={`${containerClasses} rounded-[40px] overflow-hidden`}
            style={{ zIndex: i }} // Apply z-index as inline style
          >
            <Image
              src={`/images/gallery-${i}.jpg`}
              alt={`Community member ${i}`}
              width={width} // Use dynamic width
              height={height} // Use dynamic height
              className="w-full h-full object-cover"
            />
          </div>
        )
      })}
    </div>
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
