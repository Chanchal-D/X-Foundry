"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const underlineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 })

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/team", label: "Team & Community" },
    { href: "/careers", label: "Careers & Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const el = navRefs.current[pathname]
    const containerEl = containerRef.current

    if (el && containerEl) {
      const elRect = el.getBoundingClientRect()
      const containerRect = containerEl.getBoundingClientRect()
      setUnderlineProps({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      })
    }
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-deep-space-blue/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-vibrant-accent">X</span>
            <span className="text-xl font-bold ">Foundry</span>
          </Link>

          <div className="hidden md:flex flex-col space-y-1 relative" ref={containerRef}>
            <nav className="flex items-center space-x-8 relative z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el: HTMLAnchorElement | null) => {
                    if (el) {
                      navRefs.current[link.href] = el;
                    }
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors mb-2 hover:text-vibrant-accent",
                    pathname === link.href ? "text-vibrant-accent" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <motion.div
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] bg-vibrant-accent rounded z-0"
              initial={false}
              animate={{
                left: underlineProps.left,
                width: underlineProps.width,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <Button variant="outline" className="border-vibrant-accent text-vibrant-accent hover:bg-vibrant-accent/10">
              Join the Movement
            </Button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            {/* <ThemeToggle /> */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-secondary/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-deep-space-blue/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "text-base font-medium p-2 rounded-md transition-colors hover:bg-secondary/80",
                      pathname === link.href ? "text-vibrant-accent" : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="border-vibrant-accent text-vibrant-accent hover:bg-vibrant-accent/10 w-full"
                >
                  Join the Movement
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
