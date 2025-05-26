import { HandHeart, Handshake, PackageOpen } from "lucide-react"
import WaitlistForm from "@components/waitlist-form"
import EmailWaitlistForm from "@components/EmailWaitlistForm"

export default function Home() {

  return (
    <>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-[64px] font-playfair font-bold text-[#111827] mt-5 mb-4 md:leading-[72px]">
        Connecting Hearts,
        <br />
        <span className="text-[#f97343]">Transforming Lives</span>
          </h1>
          <p className="text-[#3f4550] mb-2  mx-auto font-workSans md:text-xl">
        TunaresQ connects those in need with those who can help, creating a circular giving economy for Africans to
        support each other with fundraising, donations and volunteering.
          </p>
          <div className="flex flex-col items-center justify-center">
        <p className="text-[#3f4550] mb-8  font-bold pr-0 lg:pl-18 text-center font-workSans md:text-xl">
          Join our waitlist to get early access to what we’re building at TunaresQ!
        </p>
        <div className="w-full max-w-md">
          <EmailWaitlistForm />
        </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
           <section className="container flex justify-center">
        <div className="w-full max-w-4xl bg-hero-mobile bg-hero-desktop bg-cover bg-center h-96">
          {/* You can add content here if needed */}
        </div>
      </section>

      {/* Our Approach */}
      <section id="our-offerings" className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8">
          <span className="text-[#f97343] text-sm font-bold font-workSans">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#111827] mt-2">
        A Platform To Find and Give
        <br />
        Support in Times of Need
          </h2>
          <p className="text-[#3f4550] max-w-2xl mx-auto mt-4 font-workSans md:text-lg">
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
          <h3 className="font-bold font-playfair text-[24px] mb-2 text-[#111827]">{item.title}</h3>
          <p className="text-[#3f4550] font-workSans text-xl">{item.description}</p>
        </div>
          ))}
        </div>
      </section>

      {/* Essential Needs */}
      <section id="about" className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <span className="text-[#f97343] text-sm font-bold font-workSans">A Safe Space to Find Help</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mt-2 font-playfair">For Your Essential Needs</h2>
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
          <img
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
          <p className="text-[#3f4550] font-medium font-workSans">{item.label}</p>
        </div>
          ))}
        </div>
      </section>

      {/* How TunaresQ Works */}
      <section id="how-it-works" className="w-full py-2 md:py-6 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#111827] text-center mb-12">
        How TunaresQ Works
          </h2>

          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 lg:gap-4 mb-12 items-center">
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            1
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold font-playfair text-[#111827]">Create Your Fundraiser or Item Request</h3>
          </div>
          <p className="text-[#3f4550] font-weight-400 text-size-16 font-workSans">
            Create a fundraising campaign or item request, sharing your story and what you need help with.
          </p>
        </div>
        <div className=" relative rounded-lg overflow-hidden mx-auto">
          <img
            src="/Step 1 image.svg"
            alt="Create profile illustration"
            // fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            // priority
          />
        </div>
          </div>
          <div className="my-8">
              <hr className="border-t border-gray-300" />
            </div> {/* Line break */}

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 lg:gap-4 mb-12 items-center">
        <div className="relative rounded-lg overflow-hidden order-last md:order-first mx-auto">
          <img
            src="/Step 2 image.svg"
            alt="Browse stories illustration"
            // fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            // priority
          />
        </div>
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            2
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold font-playfair text-[#111827]">Donate items or Contribute to fundraiser</h3>
          </div>
          <p className="text-[#3f4550] font-workSans">
            As a donor,you can browse verified campaigns and choose to give through financial
            contributions or by donating physical items.
          </p>
        </div>
          </div>
          <div className="my-8">
              <hr className="border-t border-gray-300" />
            </div> {/* Line break */}

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 mb-12 items-center">
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            3
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold font-playfair text-[#111827]">Connect With Supporters</h3>
          </div>
          <p className="text-[#3f4550] font-workSans">
            Create a fundraising campaign or item request, sharing your story and what you need help with.
            We will help you amplify your request and mobilize help.
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden mx-auto">
          <img
            src="/Step 3 image.svg"
            alt="Connect with supporters illustration"
            // fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            // priority
          />
        </div>
          </div>
          <div className="my-8">
              <hr className="border-t border-gray-300" />
            </div> {/* Line break */}

          {/* Step 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
        <div className="relative rounded-lg overflow-hidden order-last md:order-first mx-auto">
          <img
            src="/Step 4 image.svg"
            alt="Give and receive support illustration"
            // fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            // priority
          />
        </div>
        <div className="flex flex-col space-y-4">
          <span className="rounded-full bg-[#F973434D] text-[#f97343] font-bold w-10 h-10 flex items-center justify-center text-lg">
            4
          </span>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl md:text-2xl font-semibold font-playfair text-[#111827]">Receive Support & Contributions</h3>
          </div>
          <p className="text-[#3f4550] font-workSans">
            Receive financial contributions or physical items from donors directly,with all transactions handled securely.Update supporters on how their help has made a diffrence,completing the circle of support
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      {/* <section className="relative" id="waitlist">
        <div className="absolute inset-0">
          <img
            src="/images/waitlist-background.jpg"
            alt="Community members supporting each other"
            // fill
            className="object-cover"
            // priority
          />
          <div className="absolute inset-0 bg-[#111827]/70"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <WaitlistForm />
        </div>
      </section> */}

<section id="waitlist" className="py-16 relative bg-[#111827]/70">
      <div className="absolute inset-0 bg-[url('/images/waitlist-background.jpg')] bg-cover bg-center opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <WaitlistForm />
      </div>
    </section>

    </>
  )
}
