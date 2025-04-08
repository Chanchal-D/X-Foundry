"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, GithubIcon } from "lucide-react"
import { motion } from "framer-motion"
import { twitterIcon, linkedinIcon, githubIcon } from "@/public/svghelpers/svg"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <footer className="bg-deep-space-blue border-t border-white/10">
      <div className="container mx-auto px-4 pt-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          <motion.div variants={fadeUp}>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-vibrant-accent">X</span>
              <span className="text-xl font-bold text-white">Foundry</span>
            </Link>
            <p className="text-sm text-foreground/70 mb-4">
              An innovation powerhouse at the intersection of AI, software, and creativity.
            </p>
            <div className="flex space-x-4">
              {[
                { label: "Twitter", icon: twitterIcon(), link: "#" },
                { label: "LinkedIn", icon: linkedinIcon(), link: "#" },
                { label: "GitHub", icon: githubIcon(), link: "#" }
              ].map((item, index) => (
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  href={item.link}
                  aria-label={item.label}
                  className="text-foreground/70 hover:text-vibrant-accent transition-colors"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <h4 className="font-bold text-lg mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              {["D3AI", "Shortify", "Coming Soon", "All Products"].map((product, index) => (
                <li key={index}>
                  <Link
                    href={`/products${product === "All Products" ? "" : `#${product.toLowerCase().replace(" ", "-")}`}`}
                    className="text-foreground/70 hover:text-vibrant-accent transition-colors"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {["Team", "Careers", "Blog", "Press"].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.toLowerCase()}`} className="text-foreground/70 hover:text-vibrant-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-bold text-lg mb-4 text-white">Subscribe</h4>
            <p className="text-sm text-foreground/70 mb-4">Stay updated with our latest news and product releases.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-cosmic-purple/30 text-white placeholder:text-foreground/50" />
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button size="icon" className="bg-vibrant-accent hover:bg-vibrant-accent/90 text-deep-space-blue">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-foreground/50 mb-4 md:mb-0">
            &copy; {currentYear} X Foundry. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy, index) => (
              <Link
                key={index}
                href="#"
                className="text-foreground/50 hover:text-vibrant-accent transition-colors"
              >
                {policy}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-foreground/40 text-sm"
        >
          Made with ❤️ by{" "}
          <a href="https://github.com/beetlejusse" target="_blank" className="underline hover:text-vibrant-accent">
            beetlejusse
          </a>{" "}
          <GithubIcon className="inline w-4 h-4 ml-1" />
        </motion.div>
      </div>
    </footer>
  )
}

