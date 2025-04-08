"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Code, Lightbulb } from "lucide-react"

export default function CommunitySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  //same here also hardcoded for now will further update in future

  const communityGroups: CommunityGroup[] = [
    {
      id: "developers",
      name: "Developers",
      description: "Connect with fellow developers building with X Foundry technologies.",
      icon: <Code className="h-8 w-8 text-vibrant-accent" />,
      members: 1250,
    },
    {
      id: "researchers",
      name: "AI Researchers",
      description: "Discuss the latest in AI research and applications.",
      icon: <Lightbulb className="h-8 w-8 text-vibrant-accent" />,
      members: 850,
    },
    {
      id: "users",
      name: "Product Users",
      description: "Get support and share tips with other X Foundry product users.",
      icon: <Users className="h-8 w-8 text-vibrant-accent" />,
      members: 3200,
    },
    {
      id: "partners",
      name: "Partners",
      description: "Exclusive group for official X Foundry partners and collaborators.",
      icon: <MessageSquare className="h-8 w-8 text-vibrant-accent" />,
      members: 420,
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
        <h3 className="text-2xl font-bold mb-6">Join Our Community</h3>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {communityGroups.map((group) => (
            <motion.div key={group.id} variants={item} className="glass-card glass-card-hover p-6 flex flex-col h-full">
              <div className="flex items-start mb-4">
                <div className="mr-4">{group.icon}</div>
                <div>
                  <h4 className="font-bold text-lg">{group.name}</h4>
                  <p className="text-sm text-foreground/80 mb-2">{group.description}</p>
                  <p className="text-xs text-vibrant-accent">{group.members.toLocaleString()} members</p>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <Button
                  variant="outline"
                  className="w-full border-vibrant-accent text-vibrant-accent hover:bg-vibrant-accent/10"
                >
                  Join WhatsApp Group
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

