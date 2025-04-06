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

  // Initialize card with a subtle floating animation
  useEffect(() => {
    if (!cardRef.current) return

    // Create floating animation
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

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return

    // Kill the floating animation when interacting
    if (tween) {
      tween.kill()
      setTween(null)
    }

    // Get card dimensions and position
    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setPosition({ x, y })

    // Apply 3D rotation effect
    gsap.to(cardRef.current, {
      rotationY: x * sensitivity,
      rotationX: -y * sensitivity,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    })

    // Apply shadow effect based on rotation
    gsap.to(cardRef.current, {
      boxShadow: `
        ${-x * depth}px ${-y * depth}px ${Math.abs(x * y) * 50 + 20}px rgba(0, 240, 255, 0.15),
        0 10px 30px rgba(0, 0, 0, 0.3)
      `,
      duration: 0.5,
    })
  }

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    if (!cardRef.current) return

    setIsHovered(false)

    // Reset to original position
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Restart floating animation
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
      className={`relative transition-transform will-change-transform ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow effect based on mouse position */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg opacity-70 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${(position.x + 0.5) * 100}% ${(position.y + 0.5) * 100}%, 
              rgba(0, 240, 255, 0.15), 
              transparent 50%
            )`,
            zIndex: -1,
          }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

