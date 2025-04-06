"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"

interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  depth?: number
  sensitivity?: number
}

export function ThreeDCard({ children, className = "", depth = 30, sensitivity = 10 }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [tween, setTween] = useState<gsap.core.Tween | null>(null)

  // Floating animation
  useEffect(() => {
    if (!cardRef.current) return

    const floatTween = gsap.to(cardRef.current, {
      y: "+=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    setTween(floatTween)
    return () => {
      floatTween.kill()
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return

    if (tween) {
      tween.kill()
      setTween(null)
    }

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setPosition({ x, y })

    gsap.to(cardRef.current, {
      rotationY: x * sensitivity,
      rotationX: -y * sensitivity,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    })

    gsap.to(cardRef.current, {
      boxShadow: `
        0 0 25px rgba(0, 217, 255, 0.2),
        ${-x * depth}px ${-y * depth}px ${Math.abs(x * y) * 60 + 20}px rgba(0, 240, 255, 0.3),
        0 10px 30px rgba(0, 0, 0, 0.3)
      `,
      duration: 0.5,
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    setIsHovered(false)

    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      boxShadow: "0 0 20px rgba(0, 217, 255, 0.1)",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (!tween) {
          const newTween = gsap.to(cardRef.current!, {
            y: "+=10",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          })
          setTween(newTween)
        }
      },
    })
  }

  return (
    <div
      ref={cardRef}
      className={`
        relative
        transition-transform
        will-change-transform
        rounded-2xl
        bg-black/50
        backdrop-blur
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 0 20px rgba(0, 217, 255, 0.08)",
      }}
    >
      {/* Glow effect under cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-60"
          style={{
            background: `radial-gradient(
              circle at ${(position.x + 0.5) * 100}% ${(position.y + 0.5) * 100}%,
              rgba(0, 240, 255, 0.12),
              transparent 60%
            )`,
            zIndex: -1,
            filter: "blur(4px)",
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 p-4">{children}</div>
    </div>
  )
}
