import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the submission
    console.log("Quote request received:", data)

    // Return success - Mickala team will follow up
    return NextResponse.json({
      success: true,
      message: "Quote request received. Our team will contact you within 24 hours.",
    })

  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit quote request" },
      { status: 500 }
    )
  }
}
