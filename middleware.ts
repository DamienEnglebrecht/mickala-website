import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Redirects for legacy URLs
  const { pathname } = request.nextUrl
  if (pathname === "/about" || pathname === "/about/") {
    return NextResponse.redirect(new URL("/our-story", request.url))
  }
  if (pathname === "/contact" || pathname === "/contact/") {
    return NextResponse.redirect(new URL("/contact-us", request.url))
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/account/login"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Protect account routes - redirect to login if not authenticated
  if (
    request.nextUrl.pathname.startsWith("/account") &&
    !request.nextUrl.pathname.startsWith("/account/login") &&
    !request.nextUrl.pathname.startsWith("/account/register") &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/account/login"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Protect parts development section — except public documents
  const publicPartsPaths = ["/parts-manuals/operation-maintenance"]
  const partsPaths = ["/parts", "/parts-manuals", "/cart", "/checkout"]
  const isPartsPath = partsPaths.some(
    (p) => request.nextUrl.pathname === p || request.nextUrl.pathname.startsWith(p + "/")
  )
  const isPublicPartsPath = publicPartsPaths.some(
    (p) => request.nextUrl.pathname === p || request.nextUrl.pathname.startsWith(p + "/")
  )
  if (isPartsPath && !isPublicPartsPath && !request.cookies.has("mickala_parts_access")) {
    const url = request.nextUrl.clone()
    url.pathname = "/parts-access"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
