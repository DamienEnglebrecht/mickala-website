import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Just redirect straight to documents — PIN gate handles access control
  return NextResponse.redirect(new URL("/documents", req.url))
}
