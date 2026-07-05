"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Eye, Activity, BarChart3, User, AtSign, Globe } from "lucide-react"

interface Visit {
  id: number
  page: string
  timestamp: string
  referrer: string
  visitor: string
  email: string
  ip: string
}

export default function TrackingReport() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/tracking")
      .then(r => r.json())
      .then(data => {
        setVisits(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const pageCount: Record<string, number> = {}
  const pageIcons: Record<string, string> = {
    "/": "🏠", "/documents": "📄", "/quote": "📊", "/credit-application": "💳",
    "/hire-schedule": "📋", "/operations": "⚙️", "/personal": "🔒",
    "/capability-statement": "📘", "/warranty": "🛡️", "/gallery": "🖼️",
    "/tracking-report": "📈"
  }

  visits.forEach(v => { pageCount[v.page] = (pageCount[v.page] || 0) + 1 })
  const sortedPages = Object.entries(pageCount).sort((a, b) => b[1] - a[1])
  const totalVisits = visits.length

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Nav */}
        <div className="flex justify-between items-center mb-6 no-print">
          <Link href="/personal" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-800">
            <ArrowLeft className="h-3 w-3 mr-1" /> Back to Personal
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Activity className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Image src="/logo-mickala.png" alt="Mickala" width={40} height={40} className="h-8 w-auto" />
                <span className="text-xs text-gray-400">Document Tracking Report</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mt-1">Page Visit Analytics</h1>
              <p className="text-sm text-gray-500 mt-0.5">Real-time tracking of document views and page visits</p>
            </div>
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-full bg-red-600 text-white px-4 py-2 text-xs font-semibold hover:bg-red-700 transition-colors no-print">
              <Printer className="h-3.5 w-3.5" /> Print Report
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-sm text-gray-400">Loading report...</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{totalVisits}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Total Visits</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{sortedPages.length}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Unique Pages</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{sortedPages[0]?.[1] || 0}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Top Page Visits</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{visits.length > 0 ? new Date(visits[0].timestamp).toLocaleDateString("en-AU") : "—"}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Latest Activity</div>
              </div>
            </div>

            {/* Page Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 sm:p-6 border-b border-gray-50">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Page Breakdown</h2>
              </div>
              <div className="p-4 sm:p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="text-left pb-3 font-semibold">Page</th>
                      <th className="text-center pb-3 font-semibold">Visits</th>
                      <th className="text-center pb-3 font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPages.map(([page, count]) => (
                      <tr key={page} className="border-t border-gray-50">
                        <td className="py-3 text-gray-900">
                          <span className="mr-2">{pageIcons[page] || "📄"}</span>
                          <span className="font-mono text-xs">{page}</span>
                        </td>
                        <td className="py-3 text-center font-semibold">{count}</td>
                        <td className="py-3 text-center text-gray-400">{Math.round(count / totalVisits * 100)}%</td>
                      </tr>
                    ))}
                    {sortedPages.length === 0 && (
                      <tr><td colSpan={3} className="py-8 text-center text-sm text-gray-400">No visits recorded yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-50">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Activity</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="text-left p-3 font-semibold">Time</th>
                      <th className="text-left p-3 font-semibold">Visitor</th>
                      <th className="text-left p-3 font-semibold hidden sm:table-cell">Email</th>
                      <th className="text-left p-3 font-semibold hidden md:table-cell">IP</th>
                      <th className="text-left p-3 font-semibold">Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.slice(0, 20).map(v => (
                      <tr key={v.id} className="border-t border-gray-50">
                        <td className="p-3 text-gray-500 font-mono">{new Date(v.timestamp).toLocaleString("en-AU")}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-medium">{v.visitor || "Guest"}</span>
                        </td>
                        <td className="p-3 text-gray-500 hidden sm:table-cell">{v.email || "—"}</td>
                        <td className="p-3 text-gray-400 font-mono text-[9px] hidden md:table-cell">{v.ip || "—"}</td>
                        <td className="p-3 text-gray-900"><span className="mr-1.5">{pageIcons[v.page] || "📄"}</span>{v.page}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-[10px] text-gray-400 flex justify-between">
          <span>Mickala Group — Document Tracking Report</span>
          <span>Generated {new Date().toLocaleString("en-AU")}</span>
        </div>
      </div>
    </div>
  )
}
