"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ModelViewerPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [autoRotate, setAutoRotate] = useState(false)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111111)

    // Camera
    const camera = new THREE.PerspectiveCamera(25, container.clientWidth / container.clientHeight, 1, 100000)
    camera.position.set(8000, 4000, 8000)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 200, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.minDistance = 500
    controls.maxDistance = 30000
    controls.minPolarAngle = 0.1
    controls.maxPolarAngle = Math.PI / 2.1
    controls.autoRotate = false
    controls.autoRotateSpeed = 1.5
    controlsRef.current = controls

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
    scene.add(hemi)

    const key = new THREE.DirectionalLight(0xffffff, 3)
    key.position.set(3000, 5000, 3000)
    key.castShadow = true
    key.shadow.mapSize.width = 1024
    key.shadow.mapSize.height = 1024
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x4488ff, 0.8)
    fill.position.set(-2000, 1000, -2000)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xffffff, 1.2)
    rim.position.set(0, 1000, -4000)
    scene.add(rim)

    const top = new THREE.DirectionalLight(0xffffff, 0.4)
    top.position.set(0, 5000, 0)
    scene.add(top)

    // Environment map (procedural)
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x222222)
    const envLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
    envScene.add(envLight)
    const envTexture = pmremGenerator.fromScene(envScene, 0, 0.1, 100).texture
    scene.environment = envTexture
    pmremGenerator.dispose()

    // Load model
    let modelLoaded = false
    import("three/examples/jsm/loaders/GLTFLoader").then(({ GLTFLoader }) => {
      const loader = new GLTFLoader()
      loader.load(
        "/mlt1000-web.glb",
        (gltf) => {
          const model = gltf.scene
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mat = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0x999999),
                roughness: 0.35,
                metalness: 0.6,
                envMapIntensity: 1.5,
                side: THREE.DoubleSide,
              })
              child.material = mat
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          scene.add(model)
          modelLoaded = true
          setLoading(false)

          // Auto-fit camera
          const box = new THREE.Box3().setFromObject(model)
          const size = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          controls.target.copy(center)
          const dist = maxDim * 1.6
          camera.position.set(dist * 0.7, dist * 0.35, dist * 0.7)
          camera.near = dist * 0.01
          camera.far = dist * 10
          camera.updateProjectionMatrix()
          controls.update()

          // Ground shadow plane
          const shadowGeo = new THREE.PlaneGeometry(maxDim * 2.5, maxDim * 2.5)
          const shadowMat = new THREE.ShadowMaterial({
            opacity: 0.25,
            color: 0x000000,
          })
          const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
          shadowPlane.rotation.x = -Math.PI / 2
          shadowPlane.position.y = box.min.y - 10
          shadowPlane.receiveShadow = true
          scene.add(shadowPlane)

          // Ground grid
          const gridHelper = new THREE.GridHelper(maxDim * 2, 20, 0x444444, 0x333333)
          gridHelper.position.y = box.min.y - 5
          scene.add(gridHelper)
        },
        (progress) => {
          // Loading progress
        },
        (error) => {
          console.error("Model load error:", error)
          setLoading(false)
        }
      )
    })

    // Animation loop
    let anim: number
    const animate = () => {
      anim = requestAnimationFrame(animate)
      if (controls.autoRotate) controls.update()
      else controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize
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

  const toggleRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate
      setAutoRotate(controlsRef.current.autoRotate)
    }
  }

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 200, 0)
      controlsRef.current.object.position.set(8000, 4000, 8000)
      controlsRef.current.update()
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col pt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">3D Interactive Model</p>
              <h1 className="text-3xl font-bold tracking-tight">MLT1000 Vertical Sincro</h1>
            </div>
            <Link href="/products" className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">← Back to Products</Link>
          </div>
        </div>

        {/* Controls bar */}
        <div className="max-w-[1200px] mx-auto px-6 pb-3 flex items-center gap-3">
          <button
            onClick={toggleRotate}
            className={`text-[11px] px-4 py-2 border tracking-wide uppercase transition-colors ${
              autoRotate
                ? "bg-[#DC2626] text-white border-[#DC2626]"
                : "text-white/60 border-white/20 hover:border-white/50"
            }`}
          >
            {autoRotate ? "Stop Rotation" : "Auto Rotate"}
          </button>
          <button
            onClick={resetView}
            className="text-[11px] text-white/60 border border-white/20 px-4 py-2 tracking-wide uppercase hover:border-white/50 transition-colors"
          >
            Reset View
          </button>
          {loading && <span className="text-[11px] text-white/40 ml-auto">Loading model...</span>}
        </div>

        {/* 3D Canvas */}
        <div ref={containerRef} className="flex-1 w-full min-h-[60vh] relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-white/50">Loading 3D Model...</p>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <p className="text-[11px] text-white/30 text-center">Drag to rotate · Scroll to zoom · Right-click to pan</p>
        </div>
      </div>
    </div>
  )
}
