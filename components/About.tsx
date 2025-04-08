"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Sparkles } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  //same here used hardcoded data for now will futher update in future

  return (
    <section id="about" className="relative py-24 bg-deep-space-blue overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-vibrant-accent/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white flex items-center justify-center gap-2">
            <Sparkles className="text-vibrant-accent h-8 w-8 animate-pulse" />
            About <span className="text-vibrant-accent ml-2">X Foundry</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 px-2 md:px-12">
            At <span className="text-vibrant-accent font-medium">X Foundry</span>, we’re redefining boundaries with
            cutting-edge AI, visionary software, and boundless innovation. Our mission is to build transformative
            technologies that disrupt industries and scale globally.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="glass-card max-w-5xl mx-auto p-8 md:p-12 backdrop-blur-lg rounded-xl border border-white/10 bg-white/5"
        >
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
            Founded by a team of visionaries with decades of combined experience in technology and innovation, we're
            committed to pushing boundaries and redefining what's possible in the digital landscape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { label: "Years Experience", value: "10+" },
              { label: "Team Members", value: "25+" },
              { label: "Products Launched", value: "5+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                className="glass-card-hover bg-gradient-to-br from-vibrant-accent/10 to-white/5 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 text-center"
              >
                <div className="text-vibrant-accent text-5xl font-extrabold mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
