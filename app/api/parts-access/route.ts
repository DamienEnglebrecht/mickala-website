import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("code")
  
  if (password === "Mickala2026") {
    const response = NextResponse.json({ success: true })
    response.cookies.set("mickala_parts_access", "granted", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })
    return response
  }
  
  return NextResponse.json({ success: false, error: "Invalid code" }, { status: 401 })
}
