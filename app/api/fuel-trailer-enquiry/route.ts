import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, config } = body

    if (!name || !email || !config) {
      return NextResponse.json({ error: "Name, email, and config are required" }, { status: 400 })
    }

    const submission = {
      id: `FT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || "",
      config: {
        configuration: config.configuration || "",
        fuelType: config.fuelType || "",
        pumpOption: config.pumpOption || "",
        mineSpec: config.mineSpec || "",
        extinguisher: config.extinguisher || "",
      },
    }

    // Save to a JSON file (append to array)
    const dataDir = path.join(process.cwd(), "data", "submissions")
    await fs.mkdir(dataDir, { recursive: true })
    const filePath = path.join(dataDir, "fuel-trailer-enquiries.json")

    let enquiries: typeof submission[] = []
    try {
      const existing = await fs.readFile(filePath, "utf-8")
      enquiries = JSON.parse(existing)
    } catch {
      enquiries = []
    }
    enquiries.push(submission)
    await fs.writeFile(filePath, JSON.stringify(enquiries, null, 2))

    console.log(`✅ Fuel trailer enquiry saved: ${submission.id} (${name}, ${email})`)

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: "Thanks! We'll be in touch with your custom quote.",
    })
  } catch (error) {
    console.error("Error saving fuel trailer enquiry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
