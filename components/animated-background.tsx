"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return


    const scene = new THREE.Scene()


    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

  
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    
    const particlesGeometry = new THREE.BufferGeometry()

    const particlesCount = 20000

    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
   
      posArray[i] = (Math.random() - 0.5) * 90

      if (i % 3 === 0) {

        colorsArray[i] = Math.random() * 0.3 + 0.1 

        colorsArray[i] = Math.random() * 0.1 
      } else {
   
        colorsArray[i] = Math.random() * 0.5 + 0.5 
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))


    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })


    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

   
    let mouseX = 0
    let mouseY = 0

    function onDocumentMouseMove(event: MouseEvent) {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0005
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0005
    }

    document.addEventListener("mousemove", onDocumentMouseMove)

    
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

     
      particlesMesh.rotation.x = elapsedTime * 0.05
      particlesMesh.rotation.y = -elapsedTime * 0.03

    
      particlesMesh.rotation.x += mouseY * 0.5
      particlesMesh.rotation.y += mouseX * 0.5

    
      renderer.render(scene, camera)

      window.requestAnimationFrame(animate)
    }

    animate()

   
    const handleResize = () => {
    
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

    
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    
    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", onDocumentMouseMove)
      containerRef.current?.removeChild(renderer.domElement)


      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background/90"
    />
  )
}
