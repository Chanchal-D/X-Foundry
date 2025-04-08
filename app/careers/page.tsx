import type { Metadata } from "next"
import JobListings from "@/components/job-listings"
import ContactForm from "@/components/contact-form"
import SocialLinks from "@/components/social-links"

export const metadata: Metadata = {
  title: "Careers & Contact | X Foundry",
  description: "Join our team or get in touch with us",
}

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center font-heading">Careers & Contact</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8 font-heading">Join Our Team</h2>
          <JobListings />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 font-heading">Get In Touch</h2>
          <ContactForm />
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 font-heading">Connect With Us</h3>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  )
}

