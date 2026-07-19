"use client"

import { useState, useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Wrench, MessageSquare, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb, Search } from "lucide-react"

// Knowledge base: symptom → diagnosis tree
const knowledgeBase: Record<string, {
  title: string
  questions: { q: string; yes: string; no: string }[]
  solutions: { label: string; steps: string[]; part?: string }[]
}> = {
  "wont start": {
    title: "Tower Won't Start",
    questions: [
      { q: "Does the panel show power (display lit)?", yes: "check_battery_voltage", no: "check_mains_power" },
      { q: "Does the engine crank when you press start?", yes: "check_fuel_delivery", no: "check_crank_circuit" },
      { q: "Do you hear the fuel pump prime for 2 seconds on key-on?", yes: "check_air_in_fuel", no: "check_fuel_pump_power" },
    ],
    solutions: [
      { label: "Dead Battery — Voltage < 22V", steps: ["Check battery voltage at terminals with multimeter (min 24V for start)", "Check battery isolator switch is turned to ON position", "Jump start via Andersen receptacle on rear of tower", "If battery won't hold charge after 2-hour run — replace", "Minimum cranking voltage: 20V — if battery drops below 20V during crank, replace"], part: "Battery — 24V Deep Cycle (120Ah)" },
      { label: "Battery Isolator Switch Off", steps: ["Locate battery isolator switch (red key, near battery box)", "Turn to ON position — panel should power up", "If panel stays dark — check main fuse", "Battery isolator is a common cause of 'dead' towers on site", "Some towers have a second isolator for the GPS unit"] },
      { label: "Main Fuse Blown (50A)", steps: ["Locate main fuse (50A ANL type, near battery)", "Check with multimeter for continuity", "Replace with same rating — do NOT use a higher amp fuse", "If blows again — there is a short circuit in main wiring", "Check battery polarity — reversed battery blows main fuse instantly"], part: "Main Fuse — 50A ANL" },
      { label: "Engine Control Fuse Blown (15A)", steps: ["Locate engine control fuse on main fuse panel", "Fuse powers the Smartgen controller and engine sensors", "If blown — panel may have power but engine won't crank", "Replace with 15A blade fuse", "If blows again — check controller wiring for short"], part: "Fuse — 15A Blade (Engine Control)" },
      { label: "Starter Motor Fault", steps: ["Check starter solenoid wiring — main cable and trigger wire", "Tap starter gently with insulated tool (brushes may be stuck)", "Check earth strap from starter to frame — loose earth = slow crank", "Measure voltage at starter main terminal during crank", "If 24V at starter but no crank — replace starter motor"], part: "Starter Motor — Kubota Z482-E" },
      { label: "Fuel System — Air Lock", steps: ["Open bleed screw on fuel filter head (2 turns)", "Operate hand primer pump until no air bubbles in fuel stream", "Tighten bleed screw", "Crank engine for 10 seconds — if no start, repeat bleed process", "If air keeps returning — check fuel pickup tube for crack"], part: "Fuel Filter — Kubota Z482" },
      { label: "Fuel Pump Failure (No Prime Sound)", steps: ["Listen for 2-second buzz on key-on — if silent, pump has no power or is dead", "Check 12V at fuel pump connector with multimeter during key-on", "Tap pump lightly with screwdriver handle — often frees stuck brushes", "Check fuel pump relay in main fuse panel", "Replace pump if 12V present but pump silent"], part: "Fuel Pump — 12V Kubota Z482-E" },
      { label: "Smartgen Controller Not Responding", steps: ["Check controller display — is it showing boot screen?", "If display is blank but panel has power — controller may be faulty", "Power cycle controller: disconnect battery for 30 seconds", "Check controller power supply (P1 connector pins 1 & 2)", "Replace controller if display stays blank after power cycle"], part: "Smartgen ALC700 Controller" },
    ],
  },
  "shutting down": {
    title: "Tower Starts Then Shuts Down",
    questions: [
      { q: "Does it run for 30+ seconds before shutting down?", yes: "check_sensors", no: "check_fuel_supply" },
      { q: "Does the Smartgen controller display show an error code? (F01-F80)", yes: "check_error_code", no: "check_air_filter" },
      { q: "Does it smoke before shutting down?", yes: "check_fuel_quality", no: "check_exhaust" },
    ],
    solutions: [
      { label: "Fuel Starvation", steps: ["Check fuel level in tank", "Check for blocked fuel line — kinked or crushed", "Replace fuel filter element", "Bleed air from system: open bleed screw on filter head", "Prime with hand primer — fuel should flow without bubbles", "Crank engine — if fuel doesn't reach injectors, bleed at injector pump too"], part: "Fuel Filter Element — Kubota Z482" },
      { label: "Low Oil Pressure Safety Shutdown", steps: ["Smartgen controller monitors oil pressure via sending unit (normally open switch)", "Engine runs for 3-5 seconds then shuts down = classic oil pressure shutdown", "Check engine oil level first (most common cause)", "Test oil pressure switch: wire to ground — engine should stay running", "If engine stays running with switch grounded — replace oil pressure switch"], part: "Oil Pressure Switch — Kubota Z482-E (N.O.)" },
      { label: "High Coolant Temp Safety Shutdown", steps: ["Controller monitors coolant temp sensor (thermistor — reduces resistance as temp rises)", "If engine shuts down after running for several minutes — check cooling system", "Check coolant level in radiator (not just overflow bottle)", "Check radiator for blocked fins", "Test coolant temp sensor: measure resistance — should decrease as engine warms"] },
      { label: "Emergency Stop Circuit Active", steps: ["E-stop buttons are normally-closed, wired in series with controller input", "If either E-stop button is pressed or wiring is broken — controller sees stop signal", "Check both E-stop buttons (panel + remote cable) — twist to release", "Test continuity across E-stop circuit with multimeter", "Check E-stop wiring harness for chafing or breaks"], part: "Emergency Stop Button — Red Mushroom" },
      { label: "Blocked Air Filter", steps: ["Remove air filter element", "Hold up to light — can you see through it clearly?", "Replace if blocked — even partial blockage causes shutdown under load", "Check pre-cleaner bowl for debris", "Check air filter housing for cracks — unfiltered air damages engine"], part: "Air Filter Element — Kubota Z482" },
      { label: "Smartgen Controller Error Codes", steps: ["F01 = overspeed — check governor/throttle linkage", "F02 = undervoltage — check AVR and battery", "F05 = low oil pressure — check oil level and pressure switch", "F08 = high coolant temp — check cooling system", "F20 = fail to start — check fuel supply and battery crank voltage", "F30 = emergency stop — check E-stop circuit", "Reference full code list in Smartgen ALC700 manual"], part: "Smartgen ALC700 Controller Manual" },
    ],
  },
  "lights flicker": {
    title: "Lights Flickering or Dim",
    questions: [
      { q: "Do all lights flicker, or just a few?", yes: "check_driver", no: "check_individual" },
      { q: "Does the flickering change with engine speed?", yes: "check_generator", no: "check_connections" },
      { q: "Are the lights dimmer than normal?", yes: "check_voltage", no: "check_led_driver" },
    ],
    solutions: [
      { label: "LED Driver Fault", steps: ["Check input voltage at LED driver (should be 24-28V DC)", "Look for fault code on LED driver — flashing LED = internal fault", "Measure output current of driver with multimeter", "Replace driver module — match model number", "Test lights after replacement before raising mast"], part: "LED Driver — 320W (match existing model)" },
      { label: "Loose Connection at Cannon Plug", steps: ["Cannon plug at mast base is the most common intermittent fault point", "Unplug and inspect pins for corrosion / bent pins", "Clean with contact cleaner and dielectric grease", "Re-seat firmly — should click into place", "Check cannon plug O-ring — missing O-ring lets moisture in"], part: "Cannon Plug Kit — Mast Base (12-pin)" },
      { label: "Generator / DC Output Fluctuation", steps: ["Check engine speed is stable — 1500 RPM ± 20 RPM", "No load voltage should be 26-28V DC (or 240V AC)", "Under load — voltage should not drop below 24V", "Check AVR (Auto Voltage Regulator) — faulty AVR causes voltage hunting", "Replace AVR if voltage fluctuates at stable engine speed"], part: "AVR — Sincro Generator" },
      { label: "Individual LED Light Head Failure", steps: ["Identify which light head is flickering", "Swap flickering head with a known-good light head", "If fault moves to the swapped position — it's the light head", "If fault stays in same position — it's the wiring or cannon plug", "Replace faulty LED light head"], part: "LED Light Head — 320W" },
      { label: "Low Voltage from Battery / Alternator", steps: ["Measure battery voltage with engine running — should be 26-28V", "If voltage is dropping under load — charging system is overloaded", "Check alternator output at alternator terminals (bypass battery)", "Clean battery terminals — voltage drop across corroded terminals causes dim lights", "Test battery under load — failing battery can't buffer alternator output"], part: "Battery Terminal Cleaner Tool" },
    ],
  },
  "mast wont raise": {
    title: "Mast Won't Raise / Lower",
    questions: [
      { q: "Is the handbrake fully released?", yes: "check_mast_brake", no: "release_handbrake_first" },
      { q: "Does the hydraulic pump run when you press raise?", yes: "check_hydraulic_oil", no: "check_limit_switches" },
      { q: "Are all three safety conditions met? (below 2.2m, mast seated, legs extended)", yes: "check_hydraulic_cylinder", no: "check_limit_switch_status" },
    ],
    solutions: [
      { label: "Low Hydraulic Oil", steps: ["Check oil level in hydraulic tank (sight glass on side of tank)", "Top up with ISO 32 hydraulic oil", "Check for leaks at cylinder seals and hose fittings", "Bleed air from system — cycle mast up/down 3 times slowly", "Re-check oil level after bleeding — top up if needed"], part: "Hydraulic Oil — ISO 32 (20L)" },
      { label: "Hydraulic Pump Motor Failure", steps: ["Listen for pump running when raise button pressed", "Check 24V at pump motor terminals with button pressed", "Check pump relay — should click when button pressed", "Check 20A pump fuse on main fuse panel", "Replace pump motor if 24V present but motor silent"], part: "Hydraulic Pump Motor — 24VDC" },
      { label: "Limit Switch 1 (LHS) — Mast Height < 2.2m", steps: ["Limit switch 1 is located on the left-hand side of the mast base", "This switch detects that the mast is fully lowered (below 2.2m)", "If mast is raised even slightly, L1 opens and disables the raise circuit", "Pull the mast down manually or lower it to re-seat L1", "Check L1 for damage — bent actuator arm means misalignment"], part: "Limit Switch — LHS (Mast Down)" },
      { label: "Limit Switch 2 (RHS) — Mast Seated in Cradle", steps: ["Limit switch 2 is on the right-hand side, wired in series with L1", "This switch detects that the mast is seated in its transport cradle", "If the mast is not fully seated (e.g., shifted in transit), L2 stays open", "Rock the mast gently to seat it fully in the cradle", "If switch is misaligned — adjust bracket position (slot mounted)"], part: "Limit Switch — RHS (Mast Seated)" },
      { label: "Limit Switch 4 (LS4) — Outriggers / Legs Extended", steps: ["Limit switch 4 detects that all outriggers are deployed", "This switch is actuated by the leg extension mechanism", "If any outrigger is not fully extended — LS4 stays open", "Extend all four outriggers fully — listen for LS4 clicking", "If LS4 is faulty — bridge temporarily to test (do NOT leave bridged)"], part: "Limit Switch — LS4 (Legs Extended)" },
      { label: "Handbrake Interlock Active", steps: ["Handbrake must be fully released for mast to raise", "Handbrake switch is a spring-loaded plunger on the handbrake lever", "If handbrake is partially released — switch may not actuate", "Push handbrake lever fully down until it clicks into released position", "If switch is misaligned — adjust or replace"], part: "Handbrake Switch Assembly" },
      { label: "Mast Binding / Mechanical Block", steps: ["Check mast sections for debris (rocks, mud, cable ties)", "Lubricate mast sections with CRC silicone spray", "Check for bent sections — visible from side profile", "Do NOT force the mast — binding can cause cable snap", "Call service if mast is binding despite lubrication"], part: "CRC Silicone Spray — Heavy Duty" },
      { label: "Hydraulic Cylinder Seized / Bypassing", steps: ["If pump runs but mast doesn't move — cylinder may be seized", "Check hydraulic pressure at cylinder port (should be >200 bar)", "If pressure is low — cylinder seals bypassing internally", "If no pressure at all — pump coupling may be stripped", "Cylinder replacement required — contact Mickala service"], part: "Hydraulic Cylinder Assembly" },
    ],
  },
  "no power": {
    title: "No Power / Panel Dead",
    questions: [
      { q: "Is the battery isolator switch turned ON?", yes: "check_battery_voltage_at_panel", no: "turn_on_isolator" },
      { q: "Does the panel light up briefly then go dark?", yes: "check_battery_charge", no: "check_main_fuse" },
      { q: "Does anything electrical work? (lights, horn, etc.)", yes: "check_panel_wiring", no: "check_master_fuse" },
    ],
    solutions: [
      { label: "Battery Isolator Switch Off", steps: ["Locate battery isolator switch (red key, near battery box)", "Turn to ON position", "Panel should power up immediately", "If not — check main fuse", "Some isolators have a removable key — ensure key is inserted"] },
      { label: "Main Fuse Blown (50A ANL)", steps: ["Locate main fuse (50A ANL type, in-line near battery positive)", "Check with multimeter for continuity across fuse", "Replace with same rating — do NOT use a higher amp", "If blows again — trace short circuit in main harness", "Common cause: starter solenoid short or battery polarity reversal"], part: "Main Fuse — 50A ANL" },
      { label: "Battery Flat — Voltage < 22V", steps: ["Measure battery voltage at terminals (should be 24-26V at rest)", "If voltage < 22V — battery is deeply discharged", "Jump start via Andersen receptacle on rear of tower", "Run engine for minimum 2 hours to recharge", "If battery won't hold charge after full recharge — replace"], part: "Battery — 24V Deep Cycle (120Ah)" },
      { label: "Battery Connection Corroded", steps: ["Check battery terminals for white/green corrosion", "Clean with terminal cleaner brush or wire brush", "Tighten terminal bolts — loose connections cause intermittent power", "Apply vaseline or terminal protectant to prevent recurrence", "Check earth strap at chassis connection — also prone to corrosion"] },
    ],
  },
  "fuel leak": {
    title: "Fuel Leak",
    questions: [
      { q: "Is the leak from the tank area?", yes: "check_tank", no: "check_lines" },
      { q: "Is the leak active while engine is running?", yes: "check_injector", no: "check_connections" },
      { q: "Can you see where it's dripping from?", yes: "assess_leak", no: "clean_inspect" },
    ],
    solutions: [
      { label: "Loose Fuel Line Connection", steps: ["Trace leak to its source — wipe clean and watch for new drips", "Tighten banjo bolt (torque 15 N·m) or hose clamp", "Clean area with degreaser after tightening", "Run engine and re-check for leaks", "Replace copper banjo washers if leak persists"], part: "Fuel Line Banjo Washer Kit (Kubota Z482)" },
      { label: "Fuel Filter Housing O-Ring Leak", steps: ["Check around filter housing seal (bowl O-ring)", "Hand-tighten filter bowl — do NOT use tools", "Replace O-ring if perished or pinched", "A leaking filter housing will draw air = hard starting", "Bleed system after any filter housing work"], part: "Fuel Filter Housing O-Ring Kit" },
      { label: "Injector Return Line Leak", steps: ["Injector return line is a low-pressure rubber hose between injectors", "Check for fuel weeping at hose ends", "Tighten hose clamps if loose", "Replace hose if perished or cracked", "Return line leaks cause air ingress, not just drips"], part: "Injector Return Hose — Kubota Z482-E" },
      { label: "Injector High-Pressure Line Leak", steps: ["High-pressure line runs from injection pump to injector", "If leaking — you'll see pulsing spray at the connection", "Engine may misfire on that cylinder", "Tighten line nut at injector — torque 20 N·m", "Replace line if cracked — do NOT attempt welding"], part: "Injector High-Pressure Line — Kubota Z482-E" },
      { label: "Fuel Tank Damage / Crack", steps: ["Identify source — tank body crack vs fitting leak", "Small cracks: clean area and apply fuel tank repair putty (JB Weld)", "Large cracks / structural damage: tank replacement required", "Drain tank before any repair attempt", "Contact Mickala for replacement tank and part number"], part: "Fuel Tank Assembly — contact Mickala" },
      { label: "Fuel Cap Vapour Leak (Smell Only)", steps: ["Check fuel cap seal — perished seal allows fuel vapour smell", "No visible dripping, just diesel smell around tank", "Replace fuel cap if seal is damaged", "Do NOT overtighten — ratcheting cap clicks when seated", "Fuel vapour in enclosed area is a safety hazard"], part: "Fuel Cap — Vented" },
    ],
  },
  "overheating": {
    title: "Engine Overheating",
    questions: [
      { q: "Is the coolant level low?", yes: "check_coolant_level", no: "check_radiator_airflow" },
      { q: "Is the radiator / oil cooler blocked with debris?", yes: "clean_radiator_fins", no: "check_fan_belt_tension" },
      { q: "Does the fan spin freely and pull air through the radiator?", yes: "check_water_pump", no: "check_fan_clutch_or_belt" },
    ],
    solutions: [
      { label: "Low Coolant", steps: ["Check overflow tank level (cold: min-max mark)", "Check radiator core level by removing cap (engine cold only!)", "Top up with 50/50 premix coolant — use distilled water if mixing", "Check for external leaks — hose clamps, radiator seams, water pump", "Check oil dipstick — milky oil = head gasket failure (see Fluid Leaks)"], part: "Coolant — 50/50 Premix 5L" },
      { label: "Blocked Radiator / Oil Cooler", steps: ["Remove debris from radiator fins — grass, mud, dust build-up", "Use compressed air — blow from fan side (back) toward front", "Check for bent/crushed fins — straighten with fin comb", "If oil cooler is blocked — engine will overheat even with good coolant", "If severely blocked — remove radiator for professional cleaning"], part: "Radiator Fin Comb" },
      { label: "Fan Belt Slipping / Broken", steps: ["Check belt tension — should deflect ~12mm (1/2 inch) at centre", "Check belt for cracks, glazing, or frayed edges", "Tension by loosening alternator bracket and pivoting alternator", "Belt too tight = alternator bearing failure. Too loose = overheating at idle.", "Replace belt if cracked or glazed"], part: "Fan Belt — Kubota Z482-E (V-Belt)" },
      { label: "Water Pump Failure", steps: ["Check for coolant drip at water pump weep hole (small hole under pump)", "Weep hole drip = mechanical seal failure — pump needs replacement", "With engine warm — feel top radiator hose (should be hot)", "Bottom hose should be noticeably cooler (temperature drop across radiator)", "If pump is seized — fan won't turn, belt will squeal or snap"], part: "Water Pump — Kubota Z482-E" },
      { label: "Thermostat Stuck Closed", steps: ["If top hose is hot but bottom hose is cold — thermostat is stuck closed", "Thermostat should open at ~82°C (Kubota Z482 spec)", "Remove thermostat and test in hot water", "Replace thermostat if not opening at correct temperature", "Re-fit with new gasket — torque housing bolts to 12 N·m"], part: "Thermostat — 82°C (Kubota Z482-E)" },
      { label: "Coolant Temperature Sensor Fault", steps: ["Smartgen controller reads coolant temp to trigger shutdown at ~105°C", "If sensor fails open circuit — controller reads 'cold' and never alarms", "If sensor fails short circuit — controller may read 'overheat' and shutdown", "Test sensor: measure resistance — should be ~2kΩ cold, ~200Ω hot", "Replace sensor if resistance values are out of spec"], part: "Coolant Temperature Sensor — Kubota Z482-E" },
    ],
  },
  "battery flat": {
    title: "Battery Not Charging / Keeps Going Flat",
    questions: [
      { q: "Does the engine charge when running? (26-28V at battery terminals)", yes: "check_parasitic_draw", no: "check_alternator_output" },
      { q: "Has the tower been sitting unused for 2+ weeks?", yes: "battery_self_discharge", no: "check_daily_charge_cycle" },
      { q: "Are any accessories or loads left on when engine is off?", yes: "turn_off_accessories", no: "check_alternator_wiring" },
    ],
    solutions: [
      { label: "Alternator Not Charging", steps: ["Measure battery voltage with engine running at 1500 RPM", "Should read 26-28V DC — if less than 26V, alternator not charging", "Check alternator 'D+' terminal (exciter wire) — needs 24V to start charging", "Check alternator belt — slipping belt = no charge", "Replace alternator if no output at B+ terminal with D+ energised"], part: "Alternator — 24V 40A (Kubota Z482-E)" },
      { label: "Parasitic Draw Draining Battery", steps: ["Disconnect battery negative terminal", "Set multimeter to DC amps and connect between negative terminal and battery post", "Normal draw should be <50mA (GPS unit + controller memory)", "If draw >100mA — pull fuses one at a time to identify circuit", "Common offenders: GPS unit not sleeping, aftermarket accessories wired directly"], part: "Multimeter — Digital Clamp Meter" },
      { label: "Battery End of Life", steps: ["Check battery manufacturing date (stamped on terminal or label)", "AGM/deep-cycle batteries typically last 3-5 years", "Load test battery — if voltage drops below 20V under load, replace", "Battery that won't hold charge after 2-hour run = end of life", "Replace both batteries if dual bank system (match age and type)"], part: "Battery — 24V Deep Cycle (120Ah) AGM" },
      { label: "Auto Start/Stop Draining Battery", steps: ["Auto start/stop cycles discharge battery on each start", "Check timer settings — does it stop/start more than 4 times per night?", "Each start draws ~50Ah from battery — alternator must run 30 min to recover", "Reduce overnight runtime if auto-starting too frequently", "Install solar charger if auto start/stop is needed for extended periods"], part: "Solar Battery Charger Kit — 100W Panel + Regulator" },
      { label: "GPS Unit Not Sleeping", steps: ["Some GPS units draw 200-500mA continuously when they lose cellular signal", "If tower is in remote area with poor reception — GPS draws more power searching", "Check GPS unit current consumption with engine off", "Install GPS power relay — cuts GPS power when engine is off (auto/manual)", "Contact Mickala for GPS sleep mode configuration"], part: "GPS Power Relay — 24V Coil" },
    ],
  },
  "runs rough": {
    title: "Engine Runs Rough / Misfiring",
    questions: [
      { q: "Does it misfire under load (lights on) or at idle?", yes: "check_fuel_delivery", no: "check_idle_circuit" },
      { q: "Has the fuel filter been changed in the last 500 hours?", yes: "check_fuel_quality", no: "replace_fuel_filter" },
      { q: "Does it blow black smoke when misfiring?", yes: "check_injectors", no: "check_compression" },
    ],
    solutions: [
      { label: "Fuel Filter Blocked", steps: ["Remove fuel filter element", "Drain water from filter bowl (if fitted)", "Install new filter element", "Bleed air from system — open bleed screw on filter head", "Prime with hand primer until solid fuel flows (no bubbles)", "Tighten bleed screw and start engine"], part: "Fuel Filter Element — Kubota Z482" },
      { label: "Air in Fuel System", steps: ["Check all fuel line connections for tightness", "Check fuel pickup tube in tank for cracks", "Check fuel return line for restrictions", "Bleed entire system: filter → injection pump → injectors", "If air persists — suspect pickup tube or suction line leak"], part: "Fuel Line Banjo Washer Kit" },
      { label: "Injector Nozzle Fault", steps: ["Identify which cylinder by cracking injector nuts one at a time", "Engine speed drop indicates that cylinder was firing", "Remove injector and inspect nozzle tip for carbon", "Replace injector if nozzle is damaged or clogged", "Torque injector to 35 N·m on refit"], part: "Injector Nozzle — Kubota Z482-E" },
      { label: "Low Compression (Worn Engine)", steps: ["Perform compression test (spec: 30-35 bar at cranking)", "Add 5mL engine oil to cylinder and retest", "If compression rises — worn piston rings", "If compression stays low — valve seat / head gasket", "Major repair required — contact Mickala service"], part: "Engine Overhaul Kit — Kubota Z482-E" },
      { label: "Contaminated Fuel (Water / Diesel Bug)", steps: ["Drain sample from fuel filter bowl", "Check for water (clear layer at bottom) or sludge (black tar)", "Drain fuel tank completely", "Replace fuel filter and fill with fresh diesel", "Add biocide treatment if diesel bug confirmed"], part: "Diesel Biocide Treatment" },
    ],
  },
  "wont stop": {
    title: "Engine Won't Stop / Run-On",
    questions: [
      { q: "Does pressing the stop button kill the engine?", yes: "check_controller_output", no: "check_fuel_solenoid" },
      { q: "Does pulling the emergency stop cable stop it?", yes: "check_stop_button_wiring", no: "check_cable_mechanism" },
      { q: "Does it eventually die after 30-60 seconds of run-on?", yes: "check_run_on_solenoid", no: "check_mechanical_stop" },
    ],
    solutions: [
      { label: "Fuel Shut-Off Solenoid Fault", steps: ["Locate the fuel shut-off solenoid on injection pump", "Listen for 'click' when stop button is pressed", "Check 24V at solenoid during stop command", "Solenoid should de-energise (spring return) to cut fuel", "If stuck — tap gently to free, replace if seized"], part: "Fuel Shut-Off Solenoid — Kubota Z482-E" },
      { label: "Stop Button / Controller Fault", steps: ["Check stop button continuity with multimeter", "Check controller output to fuel solenoid when stopped", "Bypass controller — apply 24V to solenoid should stop engine", "If solenoid works on bypass — controller output stage failed", "Replace Smartgen controller if faulty"], part: "Smartgen ALC700 Controller" },
      { label: "Run-On Solenoid Not Energising", steps: ["Run-on solenoid holds fuel rack open during cranking", "With key ON — check 24V at run-on solenoid", "If no voltage — check controller run-on output", "If has voltage but not holding — solenoid worn", "Replace run-on solenoid assembly"], part: "Run-On Solenoid — Kubota Z482-E" },
      { label: "Compression Run-On (Dieseling)", steps: ["Engine continues firing without ignition — carbon hot spot", "Usually happens on high-hour engines", "Run engine at high idle for 5 min to burn out carbon", "If persistent — decarbonisation service required", "Check fuel shut-off is fully closing rack"], part: "Engine Decarbonisation Service" },
      { label: "Emergency Stop Cable Seized", steps: ["Locate emergency stop cable at engine bay", "Pull cable manually — should feel mechanical resistance", "If cable moves freely — broken connection at engine", "Check cable attachment at fuel shut-off lever", "Lubricate cable housing and reattach"], part: "Emergency Stop Cable Assembly" },
    ],
  },
  "gps offline": {
    title: "GPS / Telemetry Offline",
    questions: [
      { q: "Is the GPS unit powered? (Check LED on unit)", yes: "check_signal", no: "check_gps_power" },
      { q: "Has the tower moved location recently?", yes: "check_sim_card", no: "check_antenna" },
      { q: "Does the controller display show telemetry online?", yes: "check_backend", no: "check_controller_connection" },
    ],
    solutions: [
      { label: "GPS Unit Power Fault", steps: ["Check GPS unit LED — solid green = online, flashing = searching, off = no power", "Check 24V supply at GPS unit connector", "Check inline fuse on GPS power wire (usually 3A)", "Check GPS ground connection — add dedicated earth if intermittent", "Replace fuse if blown — check for short circuit if blows again"], part: "GPS Unit — 3A Inline Fuse" },
      { label: "SIM Card Issue", steps: ["Remove SIM card from GPS unit", "Check SIM contacts for corrosion", "Re-seat SIM card firmly until it clicks", "Test SIM in mobile phone to confirm active", "If no data — check data allowance on Telstra 4G IoT plan"], part: "SIM Card — Telstra 4G IoT" },
      { label: "GPS Antenna Fault", steps: ["Check antenna connection at GPS unit (tighten SMA connector)", "Check antenna cable for cuts or pinch points", "Antenna must have clear sky view — no metal above it", "Replace antenna if cable is damaged", "GPS antenna is magnetic — ensure it's seated on steel surface"], part: "GPS Antenna — SMA Magnetic Mount" },
      { label: "4G / Cellular Signal Lost", steps: ["Check signal strength via web portal (should be -50 to -90 dBm)", "Tower may be in signal shadow — minesite terrain", "Move tower or use external high-gain antenna", "Check Telstra network status for outages", "Telstra 4G IoT coverage required — 3G shutdown means 3G-only units will fail"], part: "External High-Gain 4G Antenna" },
      { label: "Backend / Cloud Platform Issue", steps: ["Check Mickala telemetry portal — is any data showing?", "Power cycle GPS unit: remove fuse for 30 seconds", "Check last data timestamp on portal", "Log a ticket if multiple units offline simultaneously", "Call Mickala support for portal-side diagnostics"], part: "Mickala Telemetry Support" },
    ],
  },
  "mast unstable": {
    title: "Mast Wobbles / Unstable",
    questions: [
      { q: "Are all four outriggers / stabilisers deployed?", yes: "check_ground_conditions", no: "deploy_outriggers" },
      { q: "Is the tower on firm, level ground?", yes: "check_outrigger_pads", no: "find_level_ground" },
      { q: "Does the wobble get worse as mast extends higher?", yes: "check_wear_pads", no: "check_tower_level" },
    ],
    solutions: [
      { label: "Outriggers Not Fully Deployed", steps: ["All four outriggers must be deployed before raising mast", "Each outrigger foot must be in firm contact with ground", "Extend outriggers fully — hand-tighten locking collars", "Check limit switch 4 (legs extended) is actuated", "Re-test mast stability at 50% height before going higher"] },
      { label: "Soft / Uneven Ground", steps: ["Mining sites often have uneven or soft surfaces", "Use outrigger pads (600x600mm minimum) under each foot", "Place hardwood or steel plates on soft ground", "Adjust individual outriggers to level the tower base", "Re-check with spirit level on base frame before raising"], part: "Outrigger Pad Set — 600x600mm" },
      { label: "Mast Wear Pads Worn", steps: ["Mast sections run on composite wear pads (nylon/UHMW)", "Check gap between mast sections — excessive gap = worn pads", "Worn pads allow mast sections to wobble against each other", "Replace wear pads — 4 per mast section", "Lubricate with CRC silicone spray after replacement"], part: "Wear Pad Kit — Mast Section" },
      { label: "Mast Not Vertical (Leaning)", steps: ["Tower must be level within 3° for safe mast operation", "Check bubble level on base frame", "Adjust outriggers to correct lean — loosen high side, tighten low side", "Do NOT operate at more than 5° tilt — structural risk", "Re-check after every outrigger adjustment"], part: "Bubble Level — Mast Base" },
      { label: "Bent Mast Section", steps: ["Inspect each mast section for visible bends or dents", "Lower mast fully and check sections individually", "A bent section will cause binding AND wobble", "Do not operate with bent mast — risk of collapse", "Contact Mickala for replacement section"], part: "Mast Section — replace per tower model" },
    ],
  },
  "excessive vibration": {
    title: "Excessive Vibration",
    questions: [
      { q: "Is the vibration coming from the engine area or the mast?", yes: "check_mast_vibration", no: "check_engine_vibration" },
      { q: "Did the vibration start suddenly or gradually?", yes: "check_alternator_bearing", no: "check_engine_mounts" },
      { q: "Does the vibration change with engine speed?", yes: "check_governor_speed", no: "check_belt_pulley" },
    ],
    solutions: [
      { label: "Engine Mounts Worn / Broken", steps: ["Visually inspect four rubber engine mounts", "Check for cracked or collapsed rubber", "Worn mounts allow engine to contact frame — loud knocking", "Replace mounts in pairs (front or rear)", "Torque mount bolts to 45 N·m"], part: "Engine Mount — Kubota Z482-E" },
      { label: "Alternator / Fan Bearing Worn", steps: ["Listen for grinding noise from alternator area", "Remove alternator belt and spin alternator pulley by hand", "Rough / grating rotation = bearing failure", "Replace alternator bearing or entire alternator", "Check fan for wobble — bent fan blades cause vibration"], part: "Alternator Bearing Kit — 24V 40A" },
      { label: "Mast Section Wobble at Full Height", steps: ["Normal mast sway of 50-100mm at full height is acceptable", "Excessive wobble — check wear pads (see 'Mast Wobbles')", "Check that mast is fully seated in each lock position", "Lower mast by one section — does wobble reduce?", "If still excessive — check base frame bolts for tightness"] },
      { label: "Engine Governor / Speed Hunting", steps: ["Engine speed should be stable at 1500 RPM (50Hz)", "Speed hunting (RPM surging) = mechanical governor issue", "Check governor linkage for free movement", "Check fuel injection pump delivery", "Governor repair — requires injection pump specialist"], part: "Injection Pump Service — Kubota Z482-E" },
      { label: "Flywheel / Coupling Imbalance", steps: ["Rare — usually caused by incorrect flywheel refit", "Check coupling between engine and generator/alternator", "If vibration is at crankshaft speed — suspect flywheel", "Inspect flywheel bolts for correct torque (60 N·m)", "Contact Mickala service for professional diagnosis"] },
    ],
  },
  "auto start stop": {
    title: "Auto Start/Stop Not Working",
    questions: [
      { q: "Does the controller display show the auto mode active?", yes: "check_timer_settings", no: "check_mode_selector" },
      { q: "Does it start on manual but not on auto?", yes: "check_start_signal", no: "check_stop_signal" },
      { q: "Has the controller been recently powered down?", yes: "check_clock_battery", no: "check_sensor_wiring" },
    ],
    solutions: [
      { label: "Controller Not in Auto Mode", steps: ["Check Smartgen controller mode selector switch", "Must be set to 'Auto' for unattended operation", "In Manual mode — controller will not respond to auto-start triggers", "Switch to Auto and re-test", "If switch is faulty — replace selector switch"], part: "Smartgen ALC700 Mode Selector Switch" },
      { label: "Timer / Schedule Not Set", steps: ["Auto start/stop runs on programmable timer", "Check current time in controller — is it correct?", "Set start time: Controller Menu → Timer → Start 1", "Set stop time: Controller Menu → Timer → Stop 1", "Ensure RTC (Real Time Clock) is running"], part: "Smartgen ALC700 User Manual" },
      { label: "RTC Battery Flat (Clock Reset)", steps: ["After power loss, controller RTC resets to factory default", "If menu shows '01/01/2000' — clock battery is flat", "RTC battery is a CR2032 coin cell inside controller", "Replace battery — controller will lose settings briefly", "Re-program all timer settings after battery change"], part: "CR2032 Battery — Smartgen Controller" },
      { label: "Remote Start Signal Fault", steps: ["Auto start can be triggered by remote start terminals", "Check remote start input terminals on controller", "Jumper remote start terminals — engine should start", "If no response — check wiring from remote source", "If starts with jumper — fault is in remote signal source"], part: "Remote Start Terminal Block" },
      { label: "Stop Signal Not Reaching Controller", steps: ["Auto-stop is triggered by timer expiry OR sensor condition", "Check 'Stop Delay' setting in controller (default: 60 sec)", "If sensor stop — is the thermostat calling?", "Check coolant temp sensor for correct resistance", "Contact Mickala for controller programming support"], part: "Coolant Temperature Sensor" },
    ],
  },
  "voltage fault": {
    title: "Over-Voltage / Under-Voltage",
    questions: [
      { q: "Does the controller show a voltage alarm code?", yes: "check_controller_voltage", no: "measure_actual_voltage" },
      { q: "Is the voltage low (<22V) or high (>30V)?", yes: "check_avr", no: "check_battery_voltage" },
      { q: "Does the voltage fluctuate with engine speed?", yes: "check_governor", no: "check_wiring" },
    ],
    solutions: [
      { label: "AVR (Auto Voltage Regulator) Fault", steps: ["AVR controls alternator output voltage", "Measure AC output voltage at alternator terminals", "No-load voltage should be 26-28V DC or 240V AC", "If voltage is erratic — AVR is likely faulty", "Replace AVR — match model number on existing unit"], part: "AVR — Sincro Generator (match existing model)" },
      { label: "Engine Speed Incorrect / Hunting", steps: ["Generator output voltage is directly tied to engine RPM", "With no load — engine should run at 1500 RPM steady", "Use tachometer to measure actual speed", "Speed too low = under-voltage, too high = over-voltage", "Adjust governor linkage or replace if worn"], part: "Mechanical Governor Kit — Kubota Z482-E" },
      { label: "Loose Alternator Wiring", steps: ["Check all alternator connections for tightness", "Check main output terminals (B+ and B-)", "Check voltage sensing wire connection", "Loose sense wire = AVR gets wrong reading = wrong output", "Tighten all terminal screws and re-test"], part: "Alternator Terminal Hardware Kit" },
      { label: "Battery Acting as Voltage Regulator", steps: ["Dead battery (<22V) will drag entire system voltage down", "With engine running — alternator should charge at 26-28V", "If battery is shorted internally — alternator can't maintain voltage", "Disconnect battery and measure alternator output direct", "If voltage stabilises without battery — battery is shorted"], part: "Battery — 24V Deep Cycle" },
      { label: "Controller Voltage Sensing Fault", steps: ["Smartgen controller reads system voltage internally", "If controller shows wrong voltage but multimeter reads correct", "Controller voltage divider circuit may be faulty", "Try recalibrating in controller menu", "Replace controller if voltage reading is incorrect"], part: "Smartgen ALC700 Controller" },
    ],
  },
  "engine smoke": {
    title: "Engine Smoking — Black / White / Blue",
    questions: [
      { q: "What colour is the smoke?", yes: "identify_smoke_colour", no: "check_for_steam" },
      { q: "Does it smoke all the time or only under load?", yes: "check_load_smoke", no: "check_idle_smoke" },
      { q: "Has the engine been using more fuel recently?", yes: "check_overfueling", no: "check_oil_consumption" },
    ],
    solutions: [
      { label: "Black Smoke — Over-fuelling / Incomplete Combustion", steps: ["Black = too much fuel, not enough air", "Check air filter first — blocked filter = black smoke (see 'Shutting Down')", "Check injector timing — retarded timing causes black smoke", "Check injector nozzles for correct spray pattern", "Excessive black smoke will clog DPF (if fitted) and cause power loss"], part: "Injector Nozzle Set — Kubota Z482-E" },
      { label: "White Smoke — Unburnt Fuel / Cold Engine", steps: ["White/grey = fuel not burning completely", "Normal on cold start — clears within 30 seconds", "Persistent white smoke = low compression or injector timing", "Check glow plugs / intake heater if fitted", "If injector timing is correct — compression test"], part: "Glow Plug Kit — Kubota Z482" },
      { label: "Blue Smoke — Burning Engine Oil", steps: ["Blue = oil being burned in combustion chamber", "Check engine oil level — overfilled = blue smoke", "Worn valve stem seals — smoke on startup, clears after running", "Worn piston rings — smoke under acceleration, continuous", "Major repair required for ring/valve seal replacement"], part: "Engine Overhaul Kit — Kubota Z482-E" },
      { label: "Steam (White, Dissipates Quickly)", steps: ["Steam is water vapour — not smoke", "Usually from condensation in exhaust on cold start", "If continuous — check for coolant leak into exhaust", "Head gasket failure — check coolant for bubbles/ oil contamination", "If coolant level dropping + steam = head gasket failure"], part: "Head Gasket — Kubota Z482-E" },
      { label: "DPF (Diesel Particulate Filter) Regeneration", steps: ["If tower is fitted with DPF — periodic regeneration produces white smoke", "Normal regeneration lasts 10-20 minutes", "Regen smoke has distinct acrid smell", "If regen happens too frequently — exhaust temperature too low", "DPF may need forced regeneration or replacement"], part: "DPF Service Kit" },
    ],
  },
  "fluid leak": {
    title: "Oil / Coolant / Hydraulic Fluid Leak",
    questions: [
      { q: "What colour is the fluid? Green/blue (coolant), brown (oil), red (hydraulic)?", yes: "identify_fluid_type", no: "check_all_fluids" },
      { q: "Can you see the source of the leak while engine is running?", yes: "pressurised_leak", no: "check_cold_leak" },
      { q: "Is the fluid level dropping noticeably day to day?", yes: "significant_leak", no: "weeping_leak" },
    ],
    solutions: [
      { label: "Engine Oil Leak — Rocker Cover Gasket", steps: ["Most common oil leak on Kubota Z482-E", "Clean engine top with degreaser", "Check rocker cover bolts — torque to 10 N·m", "If still leaking — replace rocker cover gasket", "Check PCV breather — blocked breather pressurises crankcase"], part: "Rocker Cover Gasket — Kubota Z482-E" },
      { label: "Engine Oil Leak — Sump Gasket / Drain Plug", steps: ["Check sump drain plug is tight (torque 25 N·m)", "Check sump gasket — common after oil change if gasket misaligned", "Clean and inspect sump rail for damage", "Apply gasket sealant to sump rail if minor pitting", "Replace sump gasket for persistent leaks"], part: "Sump Gasket — Kubota Z482-E" },
      { label: "Coolant Leak — Radiator / Hoses", steps: ["Check radiator core for pin-hole leaks (rust stain = leak point)", "Check all hose clamps — tighten to 3 N·m (do not over-tighten)", "Check water pump weep hole — drips = seal failure", "Check overflow bottle hose for cracks", "Pressure test cooling system to find hidden leaks (1.0 bar max)"], part: "Radiator Pressure Cap — 1.0 bar" },
      { label: "Coolant Leak — Head Gasket", steps: ["Check coolant for exhaust gas bubbles (combustion leak test)", "Check oil dipstick — milky/creamy oil = coolant in oil", "Check under oil cap for white mayonnaise", "If head gasket failed — do NOT run engine", "Head gasket replacement required — contact Mickala service"], part: "Head Gasket — Kubota Z482-E" },
      { label: "Hydraulic Fluid Leak — Cylinder / Hoses", steps: ["Hydraulic system runs at high pressure — pinpointing source can be dangerous", "Clean all hoses and fittings with degreaser", "Run mast up/down and watch for drips at fittings", "Check hydraulic cylinder rod seals — fluid on cylinder body = seal failure", "Do NOT tighten fittings while system is pressurised — relieve pressure first"], part: "Hydraulic Cylinder Seal Kit" },
    ],
  },
}

const symptoms = Object.keys(knowledgeBase).map(key => ({
  id: key,
  title: knowledgeBase[key].title,
}))

export default function TroubleshooterPage() {
  const [input, setInput] = useState("")
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null)
  const [step, setStep] = useState<"input" | "diagnosing" | "result">("input")
  const [currentQ, setCurrentQ] = useState(0)
  const [results, setResults] = useState<{ label: string; steps: string[]; part?: string }[]>([])
  const [showAllSolutions, setShowAllSolutions] = useState(false)
  const [feedback, setFeedback] = useState<"helpful" | "not_helpful" | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const kb = selectedSymptom ? knowledgeBase[selectedSymptom] : null

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentQ, results])

  const handleInput = () => {
    const lower = input.toLowerCase()
    let match: string | null = null
    for (const [key, val] of Object.entries(knowledgeBase)) {
      if (lower.includes(key) || lower.includes(val.title.toLowerCase())) {
        match = key
        break
      }
    }
    // Check partial matches
    if (!match) {
      for (const [key, val] of Object.entries(knowledgeBase)) {
        const words = val.title.toLowerCase().split(" ")
        if (words.some(w => lower.includes(w))) {
          match = key
          break
        }
      }
    }
    if (match) {
      setSelectedSymptom(match)
      setCurrentQ(0)
      setResults([])
      setStep("diagnosing")
      setFeedback(null)
    } else {
      // No match — show all symptoms
      setStep("result")
      setResults([])
    }
  }

  const answerQuestion = (answer: "yes" | "no") => {
    if (!kb) return
    const question = kb.questions[currentQ]
    const nextKey = answer === "yes" ? question.yes : question.no
    
    // Check if it maps to a solution
    const matchingSolution = kb.solutions.find(s => 
      s.label.toLowerCase().includes(nextKey.replace("_", " ")) ||
      nextKey.includes(s.label.toLowerCase().slice(0, 5))
    )

    if (matchingSolution || currentQ >= kb.questions.length - 1) {
      // Show the most relevant solution
      const relevantSolutions = matchingSolution 
        ? [matchingSolution, ...kb.solutions.filter(s => s.label !== matchingSolution.label)]
        : kb.solutions
      setResults(relevantSolutions)
      setStep("result")
    } else {
      setCurrentQ(prev => Math.min(prev + 1, kb.questions.length - 1))
    }
  }

  const resetAll = () => {
    setInput("")
    setSelectedSymptom(null)
    setStep("input")
    setCurrentQ(0)
    setResults([])
    setShowAllSolutions(false)
    setFeedback(null)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
            <Wrench className="h-4 w-4 text-[#DC2626]" />
          </div>
          <p className="text-[11px] text-[#DC2626] font-medium tracking-[0.15em] uppercase">AI Technical Troubleshooter</p>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">What&apos;s going wrong?</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-2xl">
          Describe the problem with your Mickala lighting tower. Our AI will guide you through diagnosis step by step.
        </p>

        {/* Input stage */}
        {step === "input" && (
          <div>
            <div className="flex items-center gap-2 border border-white/[0.1] rounded-sm px-4 py-3 focus-within:border-[#DC2626] transition-colors mb-4">
              <Search className="h-4 w-4 text-white/30 shrink-0" />
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleInput()}
                placeholder='Describe the problem: "mast wont raise", "lights flickering", "engine shuts down"...'
                className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none"
              />
              <button onClick={handleInput}
                className="px-5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors text-xs font-semibold rounded-sm shrink-0">
                Diagnose
              </button>
            </div>

            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Or select a common issue:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {symptoms.map(s => (
                <button key={s.id} onClick={() => { setSelectedSymptom(s.id); setCurrentQ(0); setStep("diagnosing"); setResults([]); setFeedback(null) }}
                  className="text-left p-3 border border-white/[0.06] hover:border-[#DC2626]/50 rounded-sm transition-colors">
                  <p className="text-xs font-medium">{s.title}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diagnosing — Q&A */}
        {step === "diagnosing" && kb && (
          <div className="border border-white/[0.06] rounded-sm">
            {/* Chat-style header */}
            <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#DC2626]/20 flex items-center justify-center">
                  <Wrench className="h-3 w-3 text-[#DC2626]" />
                </div>
                <p className="text-xs font-semibold">Diagnosing: {kb.title}</p>
              </div>
            </div>

            {/* Question */}
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DC2626]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="h-3 w-3 text-[#DC2626]" />
                </div>
                <div>
                  <p className="text-sm mb-3">{kb.questions[currentQ].q}</p>
                  <div className="flex gap-2">
                    <button onClick={() => answerQuestion("yes")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700/30 text-emerald-400 text-xs rounded-sm transition-colors">
                      <ThumbsUp className="h-3 w-3" /> Yes
                    </button>
                    <button onClick={() => answerQuestion("no")}
                      className="inline-flex items-center gap-1.5 px-4 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-xs rounded-sm transition-colors">
                      <ThumbsDown className="h-3 w-3" /> No
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full">
                    <div className="h-full bg-[#DC2626] rounded-full transition-all"
                      style={{ width: `${((currentQ + 1) / kb.questions.length) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-white/30">Question {currentQ + 1} of {kb.questions.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {step === "result" && (
          <div className="space-y-4">
            {results.length > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
                  <p className="text-xs text-[#DC2626] font-semibold uppercase tracking-wider">
                    {kb ? `Diagnosis: ${kb.title}` : "Possible Issues"}
                  </p>
                </div>

                {/* Show first solution expanded */}
                {results.slice(0, showAllSolutions ? results.length : 1).map((sol, i) => (
                  <div key={i} className="border border-white/[0.06] rounded-sm">
                    <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{sol.label}</p>
                        {sol.part && <span className="text-[9px] text-[#DC2626] uppercase tracking-wider">Part: {sol.part}</span>}
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2">
                        {sol.steps.map((step, si) => (
                          <li key={si} className="flex items-start gap-2 text-xs text-white/70">
                            <span className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center text-[9px] text-white/40 shrink-0 mt-0.5">{si + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}

                {/* Toggle more solutions */}
                {results.length > 1 && (
                  <button onClick={() => setShowAllSolutions(!showAllSolutions)}
                    className="w-full py-3 border border-white/[0.06] hover:border-white/20 rounded-sm text-xs text-white/50 transition-colors">
                    {showAllSolutions ? "Show fewer" : `Show all ${results.length} possible causes →`}
                  </button>
                )}

                {/* No match */}
                {!kb && (
                  <div className="border border-white/[0.06] rounded-sm p-6 text-center">
                    <p className="text-sm text-white/60 mb-2">I couldn&apos;t match your description to a known issue.</p>
                    <p className="text-xs text-white/40 mb-4">Try rephrasing or select from the common issues list above.</p>
                    <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors">
                      Try Again
                    </button>
                  </div>
                )}

                {/* Feedback */}
                {kb && (
                  <div className="p-4 border border-white/[0.06] rounded-sm">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Was this helpful?</p>
                    <div className="flex gap-2">
                      <button onClick={() => setFeedback("helpful")}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs rounded-sm transition-colors ${
                          feedback === "helpful" ? "bg-emerald-900/30 text-emerald-400 border border-emerald-700/30" : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                        }`}>
                        <ThumbsUp className="h-3 w-3" /> Yes
                      </button>
                      <button onClick={() => setFeedback("not_helpful")}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs rounded-sm transition-colors ${
                          feedback === "not_helpful" ? "bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/30" : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                        }`}>
                        <ThumbsDown className="h-3 w-3" /> No
                      </button>
                    </div>
                    {feedback === "not_helpful" && (
                      <p className="text-xs text-white/40 mt-3">Call our service team: <a href="tel:1300642525" className="text-[#DC2626] hover:underline">1300 642 525</a> — 24/7 support available.</p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 border border-white/[0.1] hover:border-white/30 text-xs rounded-sm transition-colors">
                    <RotateCcw className="h-3 w-3" /> Diagnose Another Issue
                  </button>
                  <a href="tel:1300642525" className="text-xs text-white/40 hover:text-white ml-auto">Need help? 1300 642 525</a>
                </div>
              </>
            ) : (
              <div className="border border-white/[0.06] rounded-sm p-8 text-center">
                <p className="text-sm text-white/60 mb-2">No specific diagnosis available for that description.</p>
                <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold rounded-sm transition-colors mt-4">
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="mt-10 p-4 border border-white/[0.06] text-[10px] text-white/30 leading-relaxed">
          <p className="font-semibold text-white/50 mb-1">How this works</p>
          <p>The AI Troubleshooter uses a knowledge base built from Mickala service manuals and field data. Answer the questions to narrow down the cause. Parts shown are common replacements — contact Mickala to verify compatibility for your specific model.</p>
          <p className="mt-2">For urgent breakdowns: <a href="tel:1300642525" className="text-[#DC2626] hover:underline">1300 642 525</a> — 24/7 service support.</p>
        </div>
      </div>
    </div>
  )
}
