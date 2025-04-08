"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

export default function ProductShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const products: Product[] = [
    {
      id: "d3ai",
      name: "D3AI",
      description:
        "AI-powered drug discovery platform that accelerates pharmaceutical research through advanced machine learning algorithms.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "shortify",
      name: "Shortify",
      description:
        "Advanced content summarization tool that distills complex information into concise, actionable insights.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "coming-soon",
      name: "Coming Soon",
      description:
        "Our next innovative product is in development. Stay tuned for groundbreaking technology that will redefine the industry.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const [activeProduct, setActiveProduct] = useState<string>(products[0].id)

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-deep-space-blue to-cosmic-purple/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-vibrant-accent">Products</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80">
            Innovative solutions at the intersection of AI, software, and creativity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`glass-card glass-card-hover overflow-hidden cursor-pointer transition-all duration-300 ${
                activeProduct === product.id ? "ring-2 ring-vibrant-accent shadow-glow" : ""
              }`}
              onClick={() => setActiveProduct(product.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-sm text-foreground/80 mb-4">{product.description}</p>
                <Link
                  href={`/products#${product.id}`}
                  className="inline-flex items-center text-vibrant-accent hover:underline"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

