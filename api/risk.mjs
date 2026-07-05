import express from "express"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

const app = express()
app.use(express.static("."))
app.use(express.json())
const port = 3001

const designData = [
  { phase: "Transport", ref: "DR-01", hazard: "Loading/unloading — tower may be dropped or incorrectly chained", existing: "Only trained operators authorised; chains and dogs used; pre-trip inspection checklists", preRisk: "H", postRisk: "M" },
  { phase: "Transport", ref: "DR-02", hazard: "Tower may shift during transport", existing: "Pre-trip inspection, chains/dogs, driver responsible for load", preRisk: "M", postRisk: "L" },
  { phase: "Transport", ref: "DR-03", hazard: "Tail swing during tight turns", existing: "Drivers instructed; hazard awareness training", preRisk: "M", postRisk: "L" },
  { phase: "Transport", ref: "DR-04", hazard: "Bridge/structure impact — tower height exceeds allowed clearance", existing: "Trip planning; route hazard identification", preRisk: "H", postRisk: "M" },
  { phase: "Moving/Towing", ref: "MM-01", hazard: "Collision with pedestrians or vehicles during towing within yard/site", existing: "Spotters, reversing alarms, designated towing routes", preRisk: "H", postRisk: "M" },
  { phase: "Moving/Towing", ref: "MM-02", hazard: "Tower may overturn on uneven ground", existing: "Only tow on sealed or compacted ground; speed limited to 10km/h", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-01", hazard: "Stabiliser legs retracted or not fully extended — tower may tip", existing: "Operator checklist before raising mast; ground assessment; visual inspection", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-02", hazard: "Stabiliser legs sink into soft ground", existing: "Ground assessment by operator; outrigger pads used on soft ground", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-03", hazard: "Hydraulic hose burst during mast raising", existing: "Hoses inspected pre-start; visual check for wear/damage", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-04", hazard: "Mast raising — powerline contact", existing: "Minimum 6m clearance from powerlines; operator must identify overhead hazards", preRisk: "H", postRisk: "M" },
  { phase: "Set Up", ref: "SU-05", hazard: "Tower may overturn in high wind during set up", existing: "Do not raise mast in winds exceeding 20m/s (72km/h)", preRisk: "H", postRisk: "M" },
  { phase: "Start Up", ref: "ST-01", hazard: "Engine overspeed run away", existing: "Pre-start inspection; engine protection shutdown system", preRisk: "M", postRisk: "L" },
  { phase: "Start Up", ref: "ST-02", hazard: "Start-up in a confined space — risk of carbon monoxide poisoning", existing: "Only operate in well ventilated areas; CO alarms available", preRisk: "H", postRisk: "M" },
  { phase: "Operation", ref: "OP-01", hazard: "Lighting tower may overturn in high wind", existing: "Wind speed monitoring; operator instructed to lower mast in high winds", preRisk: "H", postRisk: "M" },
  { phase: "Operation", ref: "OP-02", hazard: "Refuelling — fire or explosion risk", existing: "Engine shut down and cooled before refuelling; only trained operators", preRisk: "H", postRisk: "M" },
  { phase: "Operation", ref: "OP-03", hazard: "Hot surfaces — burns to personnel", existing: "Warning labels affixed; guards fitted to hot surfaces", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-04", hazard: "Hydraulic oil leak — environmental contamination", existing: "Bunding on all hydraulic components; spill kit on site", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-05", hazard: "Unauthorised access to tower (children/public)", existing: "Lockable battery isolator; site safety rules; key control", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-06", hazard: "Noise exposure (engine running)", existing: "Towers designed to operate below 85dB(A) at 7m; hearing PPE provided", preRisk: "M", postRisk: "L" },
  { phase: "Operation", ref: "OP-07", hazard: "Electrical shock — ELV system fault", existing: "Extra Low Voltage (24/48VDC); RCD protection; hazz free volt stick test", preRisk: "M", postRisk: "L" },
  { phase: "Shutdown", ref: "SD-01", hazard: "Crush zone during mast lowering", existing: "Operator training; visual check of exclusion zone before lowering; two-person procedure", preRisk: "H", postRisk: "M" },
  { phase: "Shutdown", ref: "SD-02", hazard: "Pinch points during stabiliser retraction", existing: "Training; anti-tamper covers on stabiliser moving parts", preRisk: "M", postRisk: "L" },
  { phase: "Shutdown", ref: "SD-03", hazard: "Hydraulic fluid leak post-shutdown", existing: "Visual inspection; isolator lockout/tagout before maintenance", preRisk: "M", postRisk: "L" },
]

const operationalData = [
  { phase: "Pre-Operation", ref: "PO-01", hazard: "Diesel exhaust/fumes — CO poisoning", existing: "ELV design reduces hours; position to face away from workers; CO monitors", likelihood: 2, consequence: 5, risk: 10 },
  { phase: "Pre-Operation", ref: "PO-02", hazard: "Maintenance — entanglement in moving parts", existing: "Lockout/tagout; belt guards fitted; training", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-03", hazard: "Maintenance — stored energy (hydraulic/spring)", existing: "Lockout/tagout; training; pressure relief valves", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-04", hazard: "Repairs — electrical hazard", existing: "ELV system; RCD; lockout/tagout", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-05", hazard: "Pre-start inspection — cuts/abrasions from guards", existing: "PPE (gloves); inspection training", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Pre-Operation", ref: "PO-06", hazard: "Forklift movement — impact/crush", existing: "Training; spotters; segregation", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Pre-Operation", ref: "PO-07", hazard: "Refuelling — fire/explosion", existing: "Engine off; spill kit; training; fire extinguisher", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Operation", ref: "OP-08", hazard: "Operating in or near water (drown/electrocution)", existing: "Risk assessment required; water exclusion zone", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-09", hazard: "Operating on uneven ground (tip over)", existing: "ELV reduces hours; position to face away from workers; CO monitors", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Operation", ref: "OP-10", hazard: "Operations near powerlines (electrocution)", existing: "Minimum 6m clearance; training; spotter", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-11", hazard: "Operations near overhead hazards (mast strike)", existing: "Identification of overhead hazards; minimum 3m clearance", likelihood: 1, consequence: 4, risk: 4 },
  { phase: "Operation", ref: "OP-12", hazard: "Parking on unsealed ground (sinking/stability)", existing: "Only park on sealed/compacted ground", likelihood: 1, consequence: 3, risk: 3 },
  { phase: "Operation", ref: "OP-13", hazard: "Manual handling (fatigue/injury)", existing: "Training; mechanical aids available", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Operation", ref: "OP-14", hazard: "People waling into tower/stabilisers (trip)", existing: "Barricaded with bunting; high visibility decals", likelihood: 3, consequence: 1, risk: 3 },
  { phase: "Operation", ref: "OP-15", hazard: "Heat/cold stress to operators", existing: "Hydration policy; PPE; rest breaks", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Operation", ref: "OP-16", hazard: "Lightning strike (mast as conductor)", existing: "Training — cease operation during electrical storms; lightning detection", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-17", hazard: "Bushfire (tower in fire zone)", existing: "Site-specific fire plan; fire extinguisher on tower", likelihood: 1, consequence: 5, risk: 5 },
  { phase: "Operation", ref: "OP-18", hazard: "Wind — high speed (collapse of mast)", existing: "Lower mast in winds exceeding 20m/s", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Operation", ref: "OP-19", hazard: "Oil spill (hydraulic/environmental)", existing: "Bunding; spill kit; training", likelihood: 2, consequence: 3, risk: 6 },
  { phase: "Post-Operation", ref: "PT-01", hazard: "Mast lowering (crush zone)", existing: "Training; exclusion zone; two-person procedure", likelihood: 2, consequence: 4, risk: 8 },
  { phase: "Post-Operation", ref: "PT-02", hazard: "Stabiliser retraction (pinch points)", existing: "Training; guards; procedures", likelihood: 2, consequence: 3, risk: 6 },
  { phase: "Post-Operation", ref: "PT-03", hazard: "Tow coupling (hands trapped)", existing: "Training; use of coupling aid", likelihood: 2, consequence: 3, risk: 6 },
  { phase: "Post-Operation", ref: "PT-04", hazard: "Battery isolator off — no lights (trip/collision)", existing: "Check surrounds before isolator off; warning lights on", likelihood: 2, consequence: 2, risk: 4 },
  { phase: "Post-Operation", ref: "PT-05", hazard: "Handbrake not fully disengaged before towing (fire)", existing: "Training; tug test before towing", likelihood: 1, consequence: 3, risk: 3 },
  { phase: "Post-Operation", ref: "PT-06", hazard: "Spills left behind (environmental)", existing: "Visual inspection before departure; spill kit", likelihood: 2, consequence: 2, risk: 4 },
]

app.get("/api/design", (_, res) => res.json(designData))
app.get("/api/operational", (_, res) => res.json(operationalData))

app.listen(port, () => console.log(`API running on :${port}`))
