"use client"

import Link from "next/link"
import Image from "next/image"

export default function QuotingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/logo-mickala.png" alt="Mickala" width={40} height={40} className="h-10 w-auto" />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">QUOTING &amp; SALES</h1>
            <p className="text-xs text-gray-400">Quote tools and sales management</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/quoting/register"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="text-3xl mb-3">📋</div>
            <h2 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Quote Register</h2>
            <p className="text-sm text-gray-500 mt-1">View, search and manage all quotes created through the system. Track status and update inline.</p>
          </Link>

          <Link href="/create-quote"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="text-3xl mb-3">💰</div>
            <h2 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Create Quote</h2>
            <p className="text-sm text-gray-500 mt-1">Build professional purchase and hire quotes with print-ready PDF output.</p>
          </Link>

          <Link href="/hire-schedule"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="text-3xl mb-3">📄</div>
            <h2 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Equipment Hire Schedule</h2>
            <p className="text-sm text-gray-500 mt-1">Create and manage EHS forms with 4-step wizard and print-ready output.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
