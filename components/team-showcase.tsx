"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Linkedin, Twitter } from "lucide-react"


export default function TeamShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Hardcoded data for team members will update in the future

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Visionary leader with 15+ years of experience in AI and software development.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 2,
      name: "Jamie Chen",
      role: "CTO",
      bio: "AI researcher and engineer with a passion for building scalable systems.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Sam Rodriguez",
      role: "Head of Product",
      bio: "Product strategist focused on creating intuitive user experiences.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 4,
      name: "Taylor Kim",
      role: "Lead Designer",
      bio: "Creative director with a background in UX/UI and brand identity.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
  ]

  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)

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
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-6">Our Team</h3>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              className="glass-card glass-card-hover relative group"
              onMouseEnter={() => setActiveTeamMember(member.id)}
              onMouseLeave={() => setActiveTeamMember(null)}
            >
              <div className="relative aspect-square overflow-hidden rounded-t-xl">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-deep-space-blue/80 flex items-center justify-center transition-opacity duration-300 ${
                    activeTeamMember === member.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center p-4">
                    <p className="text-sm mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-4">
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="text-vibrant-accent hover:text-vibrant-accent/80"
                          aria-label="Twitter"
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-vibrant-accent hover:text-vibrant-accent/80"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          className="text-vibrant-accent hover:text-vibrant-accent/80"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-sm text-vibrant-accent">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

