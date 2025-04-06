"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create a grid of spheres
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x9f00ff,
      emissive: 0x9f00ff,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    })

    const spheres = []
    const gridSize = 10
    const spacing = 1

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let y = -gridSize / 2; y < gridSize / 2; y++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(x * spacing, y * spacing, 0)
        scene.add(sphere)
        spheres.push(sphere)

        // Animate each sphere
        gsap.to(sphere.position, {
          z: Math.random() * 2 - 1,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })
      }
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00f0ff, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xff00f0, 1, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Animation
    const animate = () => {
      // Rotate the entire scene slightly
      scene.rotation.x += 0.001
      scene.rotation.y += 0.002

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      window.requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)

      // Dispose resources
      sphereGeometry.dispose()
      sphereMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10 opacity-30" />
}

