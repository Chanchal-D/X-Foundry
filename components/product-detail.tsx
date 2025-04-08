"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check } from "lucide-react"

export default function ProductDetail({
  id,
  name,
  description,
  features,
  image,
  animationType,
  reversed = false,
}: ProductDetailProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const animationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animationRef.current || animationType === "none") return

    if (animationType === "molecular") {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      animationRef.current.appendChild(canvas)

      const resizeCanvas = () => {
        if (!animationRef.current) return
        canvas.width = animationRef.current.clientWidth
        canvas.height = animationRef.current.clientHeight
      }

      window.addEventListener("resize", resizeCanvas)
      resizeCanvas()

      const molecules = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        connections: [] as number[],
        color: `rgba(0, 180, 216, ${Math.random() * 0.5 + 0.5})`,
      }))

      molecules.forEach((m, i) => {
        const numConnections = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < numConnections; j++) {
          let t
          do {
            t = Math.floor(Math.random() * molecules.length)
          } while (t === i || m.connections.includes(t))
          m.connections.push(t)
        }
      })

      let animationFrameId: number
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        molecules.forEach((m, i) => {
          m.connections.forEach((t) => {
            ctx.beginPath()
            ctx.moveTo(m.x, m.y)
            ctx.lineTo(molecules[t].x, molecules[t].y)
            ctx.strokeStyle = "rgba(0, 180, 216, 0.2)"
            ctx.lineWidth = 1
            ctx.stroke()
          })
        })

        molecules.forEach((m) => {
          ctx.beginPath()
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2)
          ctx.fillStyle = m.color
          ctx.fill()

          m.x += Math.sin(Date.now() * 0.001) * 0.3
          m.y += Math.cos(Date.now() * 0.001) * 0.3

          m.x = Math.max(0, Math.min(m.x, canvas.width))
          m.y = Math.max(0, Math.min(m.y, canvas.height))
        })

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        cancelAnimationFrame(animationFrameId)
        window.removeEventListener("resize", resizeCanvas)
        if (animationRef.current?.contains(canvas)) {
          animationRef.current.removeChild(canvas)
        }
      }
    }

    if (animationType === "text") {
      const container = document.createElement("div")
      container.className =
        "absolute inset-0 flex flex-wrap gap-2 content-start p-4 text-sm text-white/60 font-mono"

      const words = [
        "Summarize",
        "Condense",
        "Extract",
        "Analyze",
        "Data",
        "Text",
        "Content",
        "NLP",
        "AI",
        "ML",
        "Smart",
        "Fast",
        "Reliable",
        "Intelligent",
        "Next-Gen",
      ]

      words.forEach((word) => {
        const span = document.createElement("span")
        span.textContent = word
        span.className =
          "bg-vibrant-accent/10 px-2 py-1 rounded-md backdrop-blur-md shadow-md"
        container.appendChild(span)
      })

      animationRef.current.appendChild(container)

      return () => {
        if (animationRef.current?.contains(container)) {
          animationRef.current.removeChild(container)
        }
      }
    }
  }, [animationType])

  return (
    <section id={id} className="py-20 px-6 md:px-16">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          reversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: reversed ? 60 : -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`${reversed ? "lg:order-2" : ""}`}
        >
          <h3 className="text-4xl underline font-extrabold mb-6 text-vibrant-accent tracking-tight">
            {name}
          </h3>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="text-vibrant-accent w-5 h-5 mt-1 mr-3 shrink-0" />
                <p className="text-gray-200 leading-snug">{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: reversed ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`relative ${reversed ? "lg:order-1" : ""}`}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm">
            <div
              ref={animationRef}
              className="absolute inset-0 z-10 pointer-events-none"
            />
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
