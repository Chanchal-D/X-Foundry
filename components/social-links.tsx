"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin, Github, Youtube, Instagram } from "lucide-react"

export default function SocialLinks() {
  const socialLinks = [
    { name: "Twitter", icon: <Twitter />, url: "#", color: "hover:text-[#1DA1F2]" },
    { name: "LinkedIn", icon: <Linkedin />, url: "#", color: "hover:text-[#0A66C2]" },
    { name: "GitHub", icon: <Github />, url: "#", color: "hover:text-white" },
    { name: "YouTube", icon: <Youtube />, url: "#", color: "hover:text-[#FF0000]" },
    { name: "Instagram", icon: <Instagram />, url: "#", color: "hover:text-[#E4405F]" },
  ]

  return (
    <div className="glass-card p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            aria-label={link.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`text-foreground/80 ${link.color} transition-colors duration-300`}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  )
}

