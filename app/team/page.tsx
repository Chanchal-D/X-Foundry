import type { Metadata } from "next"
import TeamShowcase from "@/components/team-showcase"
import CommunitySection from "@/components/community-section"
import PartnershipSection from "@/components/partnership-section"

export const metadata: Metadata = {
  title: "Team & Community | X Foundry",
  description: "Meet our team and join our community of innovators",
}

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center font-heading">
        Our Team & Community
      </h1>

      <TeamShowcase />
      <CommunitySection />
      <PartnershipSection />
    </div>
  )
}

