// Interactive Parts Manual - Fuel Trailer
// Page 1: Exploded view with hotspots
// Each hotspot links to a part in our database

const fuelTrailerParts: Record<number, PartData[]> = {
  1: [
    { id: "FT-001", name: "Tow Coupling", x: 12, y: 70, sku: "FT-COUPL-001" },
    { id: "FT-002", name: "Safety Chains", x: 15, y: 55, sku: "FT-SAFE-001" },
    { id: "FT-003", name: "Jockey Wheel Assembly", x: 10, y: 45, sku: "FT-JOCK-001" },
    { id: "FT-004", name: "Drawbar / A-Frame", x: 20, y: 60, sku: "FT-DRAW-001" },
    { id: "FT-005", name: "Hydraulic Brake Assembly", x: 25, y: 40, sku: "FT-HBRA-001" },
    { id: "FT-006", name: "Axle Hub & Bearing Kit", x: 35, y: 80, sku: "FT-AXLE-001" },
    { id: "FT-007", name: "Leaf Spring Suspension", x: 38, y: 85, sku: "FT-LEAF-001" },
    { id: "FT-008", name: "Mudguard / Guard", x: 42, y: 75, sku: "FT-GUAR-001" },
    { id: "FT-009", name: "Main Tank Body", x: 50, y: 50, sku: "FT-TANK-001" },
    { id: "FT-010", name: "Fuel Fill Point", x: 60, y: 30, sku: "FT-FILL-001" },
    { id: "FT-011", name: "Emergency Shut-off Valve", x: 65, y: 65, sku: "FT-VALV-001" },
    { id: "FT-012", name: "Delivery Hose Reel", x: 75, y: 35, sku: "FT-HOSE-001" },
    { id: "FT-013", name: "Pump Assembly (Diesel)", x: 80, y: 50, sku: "FT-PUMP-001" },
    { id: "FT-014", name: "Flow Meter", x: 82, y: 40, sku: "FT-METR-001" },
    { id: "FT-015", name: "Nozzle Gun Assembly", x: 85, y: 25, sku: "FT-NOZZ-001" },
    { id: "FT-016", name: "Earth / Bonding Cable", x: 30, y: 90, sku: "FT-EART-001" },
    { id: "FT-017", name: "Fire Extinguisher Bracket", x: 70, y: 20, sku: "FT-FIRE-001" },
    { id: "FT-018", name: "Spill Kit / Absorbent", x: 72, y: 75, sku: "FT-SPIL-001" },
    { id: "FT-019", name: "Rear Bumper / Protection", x: 90, y: 70, sku: "FT-BUMP-001" },
    { id: "FT-020", name: "LED Light Board", x: 95, y: 50, sku: "FT-LIGHT-001" },
    { id: "FT-021", name: "Number Plate Holder", x: 95, y: 60, sku: "FT-PLAT-001" },
    { id: "FT-022", name: "Side Marker Lights", x: 55, y: 85, sku: "FT-SIDE-001" },
    { id: "FT-023", name: "Over-run Brake Coupling", x: 8, y: 62, sku: "FT-BRAK-001" },
    { id: "FT-024", name: "Breakaway System", x: 22, y: 35, sku: "FT-BREA-001" },
    { id: "FT-025", name: "Roto-moulded Poly Tank", x: 55, y: 50, sku: "FT-ROTO-001" },
  ],
}
