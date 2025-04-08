"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building, Handshake, Globe } from "lucide-react"

export default function PartnershipSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const partnershipTypes: PartnershipType[] = [
    {
      id: "technology",
      title: "Technology Partners",
      description: "Integrate your technology with our products to create powerful solutions for mutual customers.",
      icon: <Building className="h-10 w-10 text-vibrant-accent" />,
    },
    {
      id: "solution",
      title: "Solution Partners",
      description: "Build specialized solutions on top of our platform to address specific industry needs.",
      icon: <Handshake className="h-10 w-10 text-vibrant-accent" />,
    },
    {
      id: "global",
      title: "Global Resellers",
      description: "Expand your portfolio by reselling X Foundry products in your region with full support.",
      icon: <Globe className="h-10 w-10 text-vibrant-accent" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-6">Partnership Opportunities</h3>

        <div className="glass-card p-8 mb-8">
          <p className="text-lg mb-6">
            Partner with X Foundry to accelerate innovation and create new opportunities for growth. We offer various
            partnership models designed to leverage our technology and reach.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {partnershipTypes.map((type) => (
              <motion.div key={type.id} variants={item} className="flex flex-col items-center text-center">
                <div className="mb-4">{type.icon}</div>
                <h4 className="font-bold text-lg mb-2">{type.title}</h4>
                <p className="text-sm text-foreground/80">{type.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Button className="bg-vibrant-accent hover:bg-vibrant-accent/90 text-deep-space-blue">
            Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

