interface CommunityGroup {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    members: number
}

interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract"
  remote: boolean
}

interface PartnershipType {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface ProductDetailProps {
  id: string
  name: string
  description: string
  features: string[]
  image: string
  animationType: "molecular" | "text" | "none"
  reversed?: boolean
}

interface Product {
    id: string
    name: string
    description: string
    image: string
}

interface TeamMember {
    id: number
    name: string
    role: string
    bio: string
    image: string
    social: {
      twitter?: string
      linkedin?: string
      github?: string
    }
  }