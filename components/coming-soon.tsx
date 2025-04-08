"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"

export default function ComingSoon() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    let time = 0
    let animationFrameId: number

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Wavy horizontal lines
      ctx.strokeStyle = "rgba(0, 180, 216, 0.2)"
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 10) {
          const wave = Math.sin((x + time * 50) * 0.01) * 5
          ctx.lineTo(x, y + wave)
        }
        ctx.stroke()
      }

      // Scanning vertical bar
      // const scanX = (time * 100) % canvas.width
      // ctx.beginPath()
      // ctx.moveTo(scanX, 0)
      // ctx.lineTo(scanX, canvas.height)
      // ctx.strokeStyle = "rgba(0, 180, 216, 0.3)"
      // ctx.lineWidth = 3
      // ctx.stroke()

      // Pulsing circles
      const numCircles = 5
      for (let i = 0; i < numCircles; i++) {
        const x = canvas.width / 2
        const y = canvas.height / 2
        const radius = (Math.sin(time + i * 0.5) + 1) * 50 + 20 * i

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 180, 216, ${0.8 - i * 0.15})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Floating glowing particles
      const numParticles = 30
      for (let i = 0; i < numParticles; i++) {
        const angle = time + i
        const radius = 200 + 20 * Math.sin(time + i)
        const x = canvas.width / 2 + Math.cos(angle) * radius
        const y = canvas.height / 2 + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 180, 216, ${0.5 + 0.5 * Math.sin(time + i)})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section id="coming-soon" className="py-16 mt-16 scroll-mt-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 md:p-12 relative overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 text-center">
          <motion.h3
            initial={{ textShadow: "0px 0px 0px rgba(0,180,216,0)" }}
            animate={{
              textShadow: [
                "0px 0px 0px rgba(0,180,216,0)",
                "0px 0px 10px rgba(0,180,216,0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="text-3xl font-bold mb-4 text-gradient"
          >
            Coming Soon
          </motion.h3>

          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Our team is working on the next generation of innovative products. Stay tuned for groundbreaking technology
            that will redefine the industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-vibrant-accent text-vibrant-accent hover:bg-vibrant-accent/10">
              Join Waitlist
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
