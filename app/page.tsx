"use client";

import Hero from "@/components/HeroSection"
import About from "@/components/About"
import ProductShowcase from "@/components/product-showcase"
import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"


export default function Home() {
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

      // Draw futuristic grid
      ctx.strokeStyle = "rgba(0, 180, 216, 0.2)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw pulsing circles
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

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <Hero />
      <About />
      <ProductShowcase />
    </>
  )
}

