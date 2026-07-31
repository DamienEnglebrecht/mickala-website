import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, assessment } = body

    if (!name || !email || !assessment) {
      return NextResponse.json(
        { error: "Name, email, and assessment are required" },
        { status: 400 }
      )
    }

    const submission = {
      id: `SA-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || "",
      company: company || "",
      assessment: {
        siteName: assessment.siteName || "",
        digFleets: assessment.digFleets ?? 0,
        sumpTrucks: assessment.sumpTrucks ?? 0,
        dozers: assessment.dozers ?? 0,
        dumps: assessment.dumps ?? 0,
        other: assessment.other ?? 0,
        mickalaTowers: assessment.mickalaTowers ?? 0,
        competitorTowers: assessment.competitorTowers ?? 0,
        offsetTowers: assessment.offsetTowers ?? 0,
        annualSavings: assessment.annualSavings ?? 0,
      },
    }

    // Save to a JSON file (append to array)
    const dataDir = path.join(process.cwd(), "data", "submissions")
    await fs.mkdir(dataDir, { recursive: true })
    const filePath = path.join(dataDir, "site-assessments.json")

    let submissions: typeof submission[] = []
    try {
      const existing = await fs.readFile(filePath, "utf-8")
      submissions = JSON.parse(existing)
    } catch {
      submissions = []
    }
    submissions.push(submission)
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2))

    console.log(`✅ Site assessment lead saved: ${submission.id} (${name}, ${email})`)

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: "Thanks! One of our lighting specialists will be in touch to discuss options.",
    })
  } catch (error) {
    console.error("Error saving site assessment lead:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
