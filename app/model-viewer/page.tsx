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

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)

    // Camera
    const camera = new THREE.PerspectiveCamera(25, container.clientWidth / container.clientHeight, 1, 100000)
    camera.position.set(8000, 4000, 8000)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 200, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.minDistance = 500
    controls.maxDistance = 30000
    controls.update()

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 2.5)
    key.position.set(3000, 5000, 3000)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x8888ff, 0.5)
    fill.position.set(-2000, 1000, -2000)
    scene.add(fill)

    const back = new THREE.DirectionalLight(0xffffff, 0.8)
    back.position.set(0, 1000, -4000)
    scene.add(back)

    const top = new THREE.DirectionalLight(0xffffff, 0.3)
    top.position.set(0, 5000, 0)
    scene.add(top)

    // Load model
    const loader = new GLTFLoader()
    loader.load("/mlt1000-web.glb", (gltf: any) => {
      const model = gltf.scene
      model.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            roughness: 0.5,
            metalness: 0.1,
            side: THREE.DoubleSide,
            envMapIntensity: 1.0,
          })
          child.castShadow = false
          child.receiveShadow = false
        }
      })
      scene.add(model)

      // Auto-fit camera to model
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      controls.target.copy(center)
      const dist = maxDim * 1.5
      camera.position.set(dist * 0.7, dist * 0.4, dist * 0.7)
      camera.near = dist * 0.01
      camera.far = dist * 10
      camera.updateProjectionMatrix()
      controls.update()
      
      // Add subtle grid
      const gridHelper = new THREE.GridHelper(maxDim * 2, 20, 0x444444, 0x333333)
      gridHelper.position.y = box.min.y - 50
      scene.add(gridHelper)
    })

    // Animation loop
    let anim: number
    const animate = () => {
      anim = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const resize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener("resize", resize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
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
