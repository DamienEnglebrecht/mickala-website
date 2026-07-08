"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function ModelViewerPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 50000)
    camera.position.set(12000, 6000, 12000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 500, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 1000
    controls.maxDistance = 50000
    controls.update()

    // Lights
    const ambient = new THREE.AmbientLight(0x404040, 0.8)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xffffff, 3)
    key.position.set(5000, 8000, 5000)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x8888ff, 0.8)
    fill.position.set(-3000, 2000, -3000)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 1.5)
    rim.position.set(-2000, 1000, 5000)
    scene.add(rim)

    const loader = new GLTFLoader()
    loader.load("/mlt1000-web.glb", (gltf) => {
      const model = gltf.scene
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.6,
            metalness: 0.3,
          })
        }
      })
      scene.add(model)
    })

    let anim: number
    const animate = () => {
      anim = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener("resize", resize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col pt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">3D Model</p>
              <h1 className="text-3xl font-bold tracking-tight">MLT1000 Vertical Sincro</h1>
            </div>
            <Link href="/products" className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">← Back to Products</Link>
          </div>
        </div>
        <div ref={containerRef} className="flex-1 w-full min-h-[60vh]" />
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <p className="text-[11px] text-white/30 text-center">Drag to rotate · Scroll to zoom · Right-click to pan</p>
        </div>
      </div>
    </div>
  )
}
