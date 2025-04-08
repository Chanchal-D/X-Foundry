import type { Metadata } from "next"
import ProductDetail from "@/components/product-detail"
import ComingSoon from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Products | X Foundry",
  description: "Explore our innovative products at the intersection of AI, software, and creativity",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center font-heading">Our Products</h1>

      <ProductDetail
        id="d3ai"
        name="D3AI"
        description="AI-powered drug discovery platform that accelerates pharmaceutical research through advanced machine learning algorithms."
        features={[
          "Molecular structure prediction",
          "Drug interaction simulation",
          "Clinical trial outcome prediction",
          "Research data integration",
        ]}
        image="/placeholder.svg?height=600&width=800"
        animationType="molecular"
      />

      <ProductDetail
        id="shortify"
        name="Shortify"
        description="Advanced content summarization tool that distills complex information into concise, actionable insights."
        features={[
          "Multi-language support",
          "Contextual understanding",
          "Customizable summary length",
          "Integration with popular platforms",
        ]}
        image="/placeholder.svg?height=600&width=800"
        animationType="text"
        reversed
      />

      <ComingSoon />
    </div>
  )
}

