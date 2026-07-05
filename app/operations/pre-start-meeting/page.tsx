"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Plus, Minus, Trash2 } from "lucide-react"

interface Attendee {
  id: number
  name: string
  signed: boolean
}

export default function PreStartMeetingPage() {
  const [site, setSite] = useState("")
  const [preparedBy, setPreparedBy] = useState("")
  const [location, setLocation] = useState("")
  const [workplace, setWorkplace] = useState("")
  const [date, setDate] = useState(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))
  const [chairperson, setChairperson] = useState("")
  const [startTime, setStartTime] = useState("")
  const [finishTime, setFinishTime] = useState("")
  const [topic, setTopic] = useState("")
  const [attendees, setAttendees] = useState<Attendee[]>([{ id: 1, name: "", signed: false }])
  const [incidents, setIncidents] = useState("")
  const [safetyConcerns, setSafetyConcerns] = useState("")
  const [reviewWork, setReviewWork] = useState("")
  const [todayWork, setTodayWork] = useState("")
  const [generalTopics, setGeneralTopics] = useState("")
  const [floorComment, setFloorComment] = useState("")
  const [floorCommentFrom, setFloorCommentFrom] = useState("")
  const [chairSig, setChairSig] = useState("")
  const [mgmtSig, setMgmtSig] = useState("")

  const nextId = attendees.length > 0 ? Math.max(...attendees.map(a => a.id)) + 1 : 1

  const addAttendee = () => setAttendees([...attendees, { id: nextId, name: "", signed: false }])
  const removeAttendee = (id: number) => setAttendees(attendees.filter(a => a.id !== id))
  const updateAttendee = (id: number, field: keyof Attendee, value: any) =>
    setAttendees(attendees.map(a => a.id === id ? { ...a, [field]: value } : a))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 print:p-2">
        <div className="flex justify-between items-start mb-4 no-print">
          <Link href="/operations" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-3 w-3" /> Operations
          </Link>
          <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Print / PDF
          </button>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <Image src="/logo-mickala.png" alt="Mickala" width={60} height={60} className="h-12 w-auto" />
            <div className="mt-1">
              <span className="text-xl font-extrabold">MICKALA</span>
              <span className="text-xl font-extrabold text-primary ml-1">GROUP</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <div>MM-OPS-TP-002</div>
            <div>ABN: 92 180 218 353</div>
            <div>1300 642 525</div>
          </div>
        </div>

        <hr className="border-primary mb-4" />

        <h1 className="text-xl font-bold text-primary mb-1">Daily Pre-Start Meeting</h1>
        <p className="text-xs text-gray-500 mb-3">Mickala Group — Site Operations</p>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
          {[
            { l: "Prepared by", v: preparedBy, s: setPreparedBy },
            { l: "Date", v: date, s: (e: any) => setDate(e.target?.value || e) },
            { l: "Location", v: location, s: setLocation },
          ].map(({ l, v, s }) => (
            <div key={l} className="flex items-center gap-1">
              <span className="font-semibold text-gray-600">{l}:</span>
              <input type="text" value={v} onChange={e => s(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-28 px-1 py-0.5 focus:outline-none focus:border-primary" />
            </div>
          ))}
        </div>

        {/* Meeting Details */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Meeting Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { l: "Workplace", v: workplace, s: setWorkplace },
              { l: "Chairperson", v: chairperson, s: setChairperson },
              { l: "Topic", v: topic, s: setTopic },
            ].map(({ l, v, s }) => (
              <div key={l}>
                <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">{l}</label>
                <input type="text" value={v} onChange={e => s(e.target.value)}
                  className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
              </div>
            ))}
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Start Time</label>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">Finish Time</label>
              <input type="time" value={finishTime} onChange={e => setFinishTime(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Attendees */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-sm text-primary uppercase tracking-wider">Attendees</h2>
            <button onClick={addAttendee} className="no-print flex items-center gap-1 text-xs text-primary hover:underline">
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {attendees.map((a) => (
              <div key={a.id} className="flex items-center gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Name"
                  value={a.name}
                  onChange={e => updateAttendee(a.id, "name", e.target.value)}
                  className="flex-1 border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 focus:outline-none focus:border-primary"
                />
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={a.signed}
                    onChange={e => updateAttendee(a.id, "signed", e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary h-3.5 w-3.5"
                  />
                  <span className="text-gray-500 text-[10px]">Signed</span>
                </label>
                {attendees.length > 1 && (
                  <button onClick={() => removeAttendee(a.id)} className="text-gray-300 hover:text-red-500 no-print">
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Incidents / Near Misses */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">Incidents / Near Misses</h2>
          <p className="text-[10px] text-gray-500 mb-2">List any Incidents or Near Misses from the previous work day</p>
          <textarea value={incidents} onChange={e => setIncidents(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary"
            placeholder="None reported" />
          <p className="text-[10px] text-gray-500 mt-2">(If yes, please ensure MM-SF-TP-001 Incident Report is completed)</p>
        </div>

        {/* Safety Concerns */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">Safety Concerns / Hazards</h2>
          <p className="text-[10px] text-gray-500 mb-2">List safety concerns/hazards from previous work day</p>
          <textarea value={safetyConcerns} onChange={e => setSafetyConcerns(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary"
            placeholder="None identified" />
        </div>

        {/* Work Flow */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">Work Flow / Task Allocation</h2>
          <p className="text-[10px] text-gray-500 mb-1">Review from previous day</p>
          <textarea value={reviewWork} onChange={e => setReviewWork(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary mb-3" />
          <p className="text-[10px] text-gray-500 mb-1">Today's work flow / task allocation</p>
          <textarea value={todayWork} onChange={e => setTodayWork(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary" />
        </div>

        {/* General Topics */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">General Topics of Discussion</h2>
          <textarea value={generalTopics} onChange={e => setGeneralTopics(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary" />
        </div>

        {/* Comment from the Floor */}
        <div className="bg-white border rounded-lg p-4 mb-4">
          <h2 className="font-bold text-sm text-primary mb-2 uppercase tracking-wider">
            Comment from the Floor — Safety / New Concept / Good News Story
          </h2>
          <textarea value={floorComment} onChange={e => setFloorComment(e.target.value)}
            className="w-full border rounded-lg p-2 text-xs min-h-[60px] focus:outline-none focus:border-primary mb-2" />
          {floorComment && (
            <div>
              <label className="font-semibold text-[10px] text-gray-600 block mb-0.5">From</label>
              <input type="text" value={floorCommentFrom} onChange={e => setFloorCommentFrom(e.target.value)}
                className="w-full border-b border-dashed border-gray-300 bg-transparent px-1 py-0.5 text-xs focus:outline-none focus:border-primary" />
            </div>
          )}
        </div>

        {/* Sign-off */}
        <div className="border rounded-lg p-4 text-xs">
          <h2 className="font-bold text-primary text-sm mb-2">Authorisation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Chairperson Signature</label>
              <input type="text" value={chairSig} onChange={e => setChairSig(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
              <span className="block text-[10px] text-gray-400 mt-0.5">{date}</span>
            </div>
            <div>
              <label className="font-semibold block mb-0.5 text-gray-600">Management Signature</label>
              <input type="text" value={mgmtSig} onChange={e => setMgmtSig(e.target.value)}
                className="border-b border-dashed border-gray-300 bg-transparent w-full px-1 py-0.5 focus:outline-none focus:border-primary font-script text-sm"
                placeholder="Sign here" />
              <span className="block text-[10px] text-gray-400 mt-0.5">{date}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t text-[9px] text-gray-400 flex justify-between">
          <span>Document: MM-OPS-TP-002</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}
