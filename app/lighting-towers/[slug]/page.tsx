// Server component — owns generateStaticParams and hands data to the client component
import { notFound } from "next/navigation"
import { LightingTowerClient } from "./LightingTowerClient"

// ---------------------------------------------------------------------------
// Types (shared — also imported by the client component)
// ---------------------------------------------------------------------------

export type ModelData = {
  name: string
  led: string
  desc: string
  image: string
  slug: string
  priceFrom?: string
  specSheet?: string
  lightSim?: string
}

export type CategoryData = {
  title: string
  description: string
  heroImage: string
  statLine: string
  models: ModelData[]
  specs: string[][]
  features: string[]
}

// ---------------------------------------------------------------------------
// Data — unchanged from V1
// ---------------------------------------------------------------------------

const categories: Record<string, CategoryData> = {
  "single-axle": {
    title: "Single Axle",
    description: "Compact, towable and quick to deploy. Ideal for fast-moving worksites that need reliable area lighting without the footprint.",
    heroImage: "/single-axle-hero.jpg",
    statLine: "4 models · 1200W – 2560W · Rapid deployment",
    models: [
      { name: "MLT 1280-4LED", led: "1200W", desc: "Entry-level single axle. Compact and lightweight for fast-moving worksites.", image: "/product-images/doc_f9ffe13e2ce8_mlt-1280-4led-single-axle-tower.png", slug: "single-axle-1280-4led", priceFrom: "$38,500", specSheet: "/spec-sheets/single-axle-1280-4led.pdf", lightSim: "/spec-sheets/single-axle-1280-4led-lightsim.pdf" },
      { name: "MLT 1280-6LED", led: "1200W", desc: "Higher output with 6-LED array for medium-sized work areas.", image: "/product-images/doc_675019b64b3f_mlt-1280-6led-single-axle-tower.png", slug: "single-axle-1280-6led", priceFrom: "$39,500", specSheet: "/spec-sheets/single-axle-1280-6led.pdf", lightSim: "/spec-sheets/single-axle-1280-6led-lightsim.pdf" },
      { name: "MLT 1920-LED", led: "1920W", desc: "Maximum illumination for large-scale operations on a single axle.", image: "/product-images/doc_9db394285565_mlt-1920-led-single-axle-tower.png", slug: "single-axle-1920-led", priceFrom: "$52,500", specSheet: "/spec-sheets/single-axle-1920-led.pdf", lightSim: "/spec-sheets/single-axle-1920-led-lightsim.pdf" },
      { name: "MLT 2560-LED", led: "2560W", desc: "Extreme output for the largest work sites. Single axle, maximum coverage.", image: "/product-images/doc_ca1d46669f30_mlt-2560-led-single-axle-tower.png", slug: "single-axle-2560-led", priceFrom: "$62,500", specSheet: "/spec-sheets/single-axle-2560-led.pdf", lightSim: "/spec-sheets/single-axle-2560-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "1200W – 2560W"],
      ["Mast Type", "Telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Jump start receptacle — no battery explosion risk",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Air pre-cleaner — longer filter life in dusty conditions",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
  "dual-axle": {
    title: "Dual Axle",
    description: "Heavy-duty stability for large coverage areas. Built for the toughest mining and construction environments.",
    heroImage: "/dual-axle-hero.jpg",
    statLine: "3 models · 2560W – 3840W · Heavy-duty stability",
    models: [
      { name: "MLT 2560-LED", led: "2560W", desc: "Dual axle stability with high-output LED array for demanding conditions.", image: "/product-images/doc_caaa568cee08_mlt-2560-led-dual-axle-tower.png", slug: "dual-axle-2560-led", specSheet: "/spec-sheets/dual-axle-2560-led.pdf", lightSim: "/spec-sheets/dual-axle-2560-led-lightsim.pdf" },
      { name: "MLT 3200-LED", led: "3200W", desc: "High-output lighting for large industrial sites.", image: "/product-images/doc_0db128540ed1_mlt-3200-led-dual-axle-tower.png", slug: "dual-axle-3200-led", specSheet: "/spec-sheets/dual-axle-3200-led.pdf", lightSim: "/spec-sheets/dual-axle-3200-led-lightsim.pdf" },
      { name: "MLT 3840-LED", led: "3840W", desc: "Maximum coverage and illumination — the flagship dual axle model.", image: "/product-images/doc_830a8f6c08db_mlt-3840-led-dual-axle-tower.png", slug: "dual-axle-3840-led", specSheet: "/spec-sheets/dual-axle-3840-led.pdf", lightSim: "/spec-sheets/dual-axle-3840-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "2560W – 3840W"],
      ["Mast Type", "Telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Jump start receptacle — no battery explosion risk",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Air pre-cleaner — longer filter life in dusty conditions",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
  "sled-mount": {
    title: "Sled Mount",
    description: "Skid-mounted for crane and forklift relocation around fixed sites. No wheels, no fuss — just dependable illumination.",
    heroImage: "/sled-mount-hero.jpg",
    statLine: "3 models · 2560W – 3840W · Skid-mounted",
    models: [
      { name: "MLS 2560-LED", led: "2560W", desc: "Entry-level sled mount. Compact skid design for crane and forklift deployment.", image: "/product-images/doc_9ba284db2a30_mls-2560-led-sled-mounted-tower.png", slug: "sled-mount-2560-led", specSheet: "/spec-sheets/sled-mount-2560-led.pdf", lightSim: "/spec-sheets/sled-mount-2560-led-lightsim.pdf" },
      { name: "MLS 3200-LED", led: "3200W", desc: "High-output sled mount for remote sites requiring maximum uptime.", image: "/product-images/doc_fdeca1e9b4f9_mls-3200-led-sled-mounted-tower.png", slug: "sled-mount-3200-led", specSheet: "/spec-sheets/sled-mount-3200-led.pdf", lightSim: "/spec-sheets/sled-mount-3200-led-lightsim.pdf" },
      { name: "MLS 3840-LED", led: "3840W", desc: "Maximum illumination for remote operations. The ultimate sled mount tower.", image: "/product-images/doc_abd280e3fc3c_mls-3840-led-sled-mounted-tower.png", slug: "sled-mount-3840-led", specSheet: "/spec-sheets/sled-mount-3840-led.pdf", lightSim: "/spec-sheets/sled-mount-3840-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "2560W – 3840W"],
      ["Mast Type", "Telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Jump start receptacle — no battery explosion risk",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Air pre-cleaner — longer filter life in dusty conditions",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
  "long-range": {
    title: "Long Range",
    description: "Extended mast and long-throw optics for high-mast applications and expansive open-cut operations.",
    heroImage: "/long-range-hero.jpg",
    statLine: "2 models · 4800W – 7200W · High-mast ready",
    models: [
      { name: "MLR 4800-LED", led: "4800W", desc: "Extended runtime and coverage for large-scale operations.", image: "/product-images/doc_8391d0d6a389_mlr-4800-led-sled-mounted-tower.png", slug: "long-range-4800-led", specSheet: "/spec-sheets/long-range-4800-led.pdf", lightSim: "/spec-sheets/long-range-4800-led-lightsim.pdf" },
      { name: "MLR 7200-LED", led: "7200W", desc: "Maximum coverage for the largest mining and industrial sites.", image: "/product-images/doc_b1045367b1fd_mlr-7200-led-sled-mounted-tower.png", slug: "long-range-7200-led", specSheet: "/spec-sheets/long-range-7200-led.pdf", lightSim: "/spec-sheets/long-range-7200-led-lightsim.pdf" },
    ],
    specs: [
      ["Wattage", "4800W – 7200W"],
      ["Mast Type", "Extended telescopic"],
      ["Voltage", "ELV 24VDC"],
      ["Compliance", "MDG15, MDG41"],
      ["Paint Process", "3-stage, e-coated, baked 180°C"],
      ["Warranty", "12 months / 1500 hrs"],
    ],
    features: [
      "Extra Long-range optics for high-mast applications",
      "Extra Low Voltage (24VDC) — any auto electrician can service",
      "MDG15 & MDG41 compliant — movement across states uncompromised",
      "3-stage paint process — e-coated & baked at 180°C",
      "LED low-level fuel beacon — never run out of fuel",
      "GPS remote monitoring option",
      "Lockable starter & battery isolators",
      "Emergency stop x 2 — highest mining safety standards",
      "Self-bunded — all contaminants contained",
      "Fire extinguisher (4.5–9 kg) as standard",
      "Tier IV engines — lower emissions, Australian compliant",
    ],
  },
}

// ---------------------------------------------------------------------------
// Page — server component, passes plain data to client component
// ---------------------------------------------------------------------------

export default async function LightingTowerPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const cat = categories[slug]
  if (!cat) notFound()

  return <LightingTowerClient slug={slug} cat={cat} />
}

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }))
}
