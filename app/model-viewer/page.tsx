"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const specs = [
  { label: "Model", value: "MLT1000" },
  { label: "Type", value: "Vertical Boom, Sincro Alternator" },
  { label: "Mast Height", value: "10 m" },
  { label: "Max Wind Speed", value: "130 km/h (operating)" },
  { label: "Engine", value: "Kubota Z482, 4.3 kW" },
  { label: "Alternator", value: "Sincro 8 kVA" },
  { label: "Fuel Capacity", value: "105 L (diesel)" },
  { label: "Run Time", value: "~80 hours @ half load" },
  { label: "Sound Level", value: "62 dB(A) @ 7 m" },
  { label: "Weight", value: "~2,200 kg" },
  { label: "Dimensions", value: "3,700 × 1,900 × 2,500 mm (stowed)" },
]

export default function ModelViewerPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const controlsRef = useRef<OrbitControls | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    // Camera
    const camera = new THREE.PerspectiveCamera(25, container.clientWidth / container.clientHeight, 1, 100000)
    camera.position.set(8000, 4000, 8000)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 200, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.minDistance = 500
    controls.maxDistance = 30000
    controls.minPolarAngle = 0.05
    controls.maxPolarAngle = Math.PI / 2.05
    controls.autoRotate = false
    controls.autoRotateSpeed = 1.8
    controlsRef.current = controls

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5)
    scene.add(hemi)

    const key = new THREE.DirectionalLight(0xffffff, 3.5)
    key.position.set(4000, 6000, 4000)
    key.castShadow = true
    key.shadow.mapSize.width = 1024
    key.shadow.mapSize.height = 1024
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x4488ff, 0.6)
    fill.position.set(-3000, 1500, -2000)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xffffff, 1.5)
    rim.position.set(0, 2000, -5000)
    scene.add(rim)

    const top = new THREE.DirectionalLight(0xffffff, 0.3)
    top.position.set(0, 6000, 0)
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
    import("three/examples/jsm/loaders/GLTFLoader").then(({ GLTFLoader }) => {
      const loader = new GLTFLoader()
      loader.load(
        "/mlt1000-web.glb",
        (gltf) => {
          const model = gltf.scene
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const hasVertexColors = child.geometry.attributes.color !== undefined
              const mat = new THREE.MeshStandardMaterial({
                color: hasVertexColors ? 0xffffff : new THREE.Color(0xaaaaaa),
                vertexColors: hasVertexColors,
                roughness: 0.3,
                metalness: 0.7,
                envMapIntensity: 1.8,
                side: THREE.DoubleSide,
              })
              child.material = mat
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          scene.add(model)

          // Auto-fit camera
          const box = new THREE.Box3().setFromObject(model)
          const size = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          controls.target.copy(center)
          const dist = maxDim * 1.5
          camera.position.set(dist * 0.7, dist * 0.35, dist * 0.7)
          camera.near = dist * 0.01
          camera.far = dist * 10
          camera.updateProjectionMatrix()
          controls.update()

          // Ground shadow plane
          const shadowGeo = new THREE.PlaneGeometry(maxDim * 3, maxDim * 3)
          const shadowMat = new THREE.ShadowMaterial({
            opacity: 0.2,
            color: 0x000000,
          })
          const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
          shadowPlane.rotation.x = -Math.PI / 2
          shadowPlane.position.y = box.min.y - 10
          shadowPlane.receiveShadow = true
          scene.add(shadowPlane)

          // Ground grid (subtle)
          const gridHelper = new THREE.GridHelper(maxDim * 2.5, 24, 0x333333, 0x222222)
          gridHelper.position.y = box.min.y - 5
          scene.add(gridHelper)

          setLoading(false)
        },
        (progress) => {
          if (progress.total > 0) {
            setLoadProgress(Math.round((progress.loaded / progress.total) * 100))
          }
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
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const resize = () => {
      if (!container || !camera || !renderer) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
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
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.target.set(0, 200, 0)
      cameraRef.current.position.set(8000, 4000, 8000)
      controlsRef.current.update()
    }
  }

  const toggleFullscreen = () => {
    const el = viewerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setFullscreen(false)
    } else {
      el.requestFullscreen()
      setFullscreen(true)
    }
  }

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <SiteHeader />
      <div ref={viewerRef} className="flex-1 flex flex-col pt-20">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 py-6 w-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">3D Interactive Model</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">MLT1000 Vertical Sincro</h1>
              <p className="text-sm text-white/40 mt-1">10 m LED lighting tower · Kubota Z482 · 80-hour runtime</p>
            </div>
            <Link href="/products" className="text-[11px] text-white/40 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap ml-4">← Products</Link>
          </div>
        </div>

        {/* Controls bar */}
        <div className="max-w-[1400px] mx-auto px-6 pb-3 flex items-center gap-2 flex-wrap">
          <button
            onClick={toggleRotate}
            className={`text-[11px] px-4 py-2 border tracking-[0.1em] uppercase transition-colors ${
              autoRotate
                ? "bg-[#DC2626] text-white border-[#DC2626]"
                : "text-white/50 border-white/10 hover:border-white/40"
            }`}
          >
            {autoRotate ? "Stop Rotation" : "Auto Rotate"}
          </button>
          <button
            onClick={resetView}
            className="text-[11px] text-white/50 border border-white/10 px-4 py-2 tracking-[0.1em] uppercase hover:border-white/40 transition-colors"
          >
            Reset View
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-[11px] text-white/50 border border-white/10 px-4 py-2 tracking-[0.1em] uppercase hover:border-white/40 transition-colors"
          >
            {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          <a
            href="/mlt1000-web.glb"
            download
            className="text-[11px] text-white/50 border border-white/10 px-4 py-2 tracking-[0.1em] uppercase hover:border-white/40 transition-colors"
          >
            Download GLB
          </a>
          {loading && (
            <span className="text-[11px] text-white/30 ml-auto">
              {loadProgress > 0 ? `Loading ${loadProgress}%` : "Loading model..."}
            </span>
          )}
        </div>

        {/* 3D Canvas */}
        <div ref={containerRef} className="flex-1 w-full min-h-[50vh] max-h-[70vh] relative">
          {/* Progress bar */}
          {loading && loadProgress > 0 && (
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 z-10">
              <div
                className="h-full bg-[#DC2626] transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs text-white/40 tracking-wide uppercase">Loading 3D model...</p>
              </div>
            </div>
          )}
        </div>

        {/* Touch hints */}
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-6 text-[10px] text-white/20 tracking-[0.05em] uppercase">
            <span>Drag to rotate</span>
            <span className="w-[1px] h-3 bg-white/10" />
            <span>Scroll to zoom</span>
            <span className="w-[1px] h-3 bg-white/10" />
            <span>Right-click to pan</span>
          </div>
        </div>

        {/* Specs panel */}
        <div className="max-w-[1400px] mx-auto px-6 py-8 w-full border-t border-white/5">
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase mb-6">Technical Specifications</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
            {specs.map((s) => (
              <div key={s.label} className="py-2">
                <p className="text-[10px] text-white/30 tracking-[0.1em] uppercase">{s.label}</p>
                <p className="text-sm text-white/80 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
