"use client"

import { useState } from "react"
import { ArrowLeft, Search, Printer, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface Payment {
  chinese: string; english: string; desc: string; po: string; invoice: string
  purpose: string; method: string; amount: number; clearing: string; due: number; notes: string
}

const payments: Payment[] = [
  {chinese:"工资社保、公积金",english:"Wages, Social Insurance & Housing Fund",desc:"Wages",po:"/",invoice:"/",purpose:"wages",method:"ZJG Basic-M&T",amount:338713.30,clearing:"Balance",due:338713.30,notes:""},
  {chinese:"荷聚钛辉照明（上海）有限公司",english:"Heju Titanium Hui Lighting (Shanghai) Co., Ltd.",desc:"Part Procurement",po:"ME 0429",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:1701685.95,clearing:"Balance",due:1701685.95,notes:"¥2,537,167.73"},
  {chinese:"荷聚钛辉照明（上海）有限公司",english:"Heju Titanium Hui Lighting (Shanghai) Co., Ltd.",desc:"Part Procurement",po:"ME 0475",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:1125468.40,clearing:"Balance",due:1125468.40-600000,notes:""},
  {chinese:"荷聚钛辉照明（上海）有限公司",english:"Heju Titanium Hui Lighting (Shanghai) Co., Ltd.",desc:"Part Procurement",po:"ME 0528",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:3952.00,clearing:"Balance",due:3952.00,notes:""},
  {chinese:"荷聚钛辉照明（上海）有限公司",english:"Heju Titanium Hui Lighting (Shanghai) Co., Ltd.",desc:"Part Procurement",po:"ME 0530",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:306061.38,clearing:"Balance",due:306061.38,notes:""},
  {chinese:"合肥捷梦斯机械有限公司",english:"Hefei Jiemengsi Machinery Co., Ltd.",desc:"Part Procurement",po:"ME 0533",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:221250.00,clearing:"Balance",due:221250.00,notes:""},
  {chinese:"宁国市汉诺新型材料有限公司",english:"Ningguo Hannuo New Materials Co., Ltd.",desc:"Part Procurement",po:"ME 0539",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:100000.00,clearing:"Balance",due:100000.00,notes:""},
  {chinese:"张家港保税区灵通进出口有限公司",english:"Zhangjiagang FTZ Lingtong Import & Export Co., Ltd.",desc:"Material",po:"ME 0406",invoice:"/",purpose:"Material",method:"ZJG Basic-M",amount:512755.00,clearing:"Balance",due:512755.00-300000,notes:"10月 ¥704,335"},
  {chinese:"无锡市中大流体工程机械有限公司",english:"Wuxi Zhongda Fluid Engineering Machinery Co., Ltd.",desc:"Part Procurement",po:"ME 0416",invoice:"✓",purpose:"Part Procurement",method:"ZJG Basic-M",amount:491580.00,clearing:"Balance",due:491580.00,notes:""},
  {chinese:"无锡市中大流体工程机械有限公司",english:"Wuxi Zhongda Fluid Engineering Machinery Co., Ltd.",desc:"Part Procurement",po:"ME 0476",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:122600.00,clearing:"Balance",due:122600.00,notes:"1月 ¥196,372.32"},
  {chinese:"无锡市中大流体工程机械有限公司",english:"Wuxi Zhongda Fluid Engineering Machinery Co., Ltd.",desc:"Part Procurement",po:"ME 0489",invoice:"✓",purpose:"Part Procurement",method:"ZJG Basic-M",amount:33600.00,clearing:"Balance",due:33600.00,notes:""},
  {chinese:"张家港市明锐激光机械有限公司",english:"Zhangjiagang Mingrui Laser Machinery Co., Ltd.",desc:"Material",po:"ME 0500",invoice:"✓",purpose:"Material",method:"ZJG Basic-M",amount:490172.32,clearing:"Balance",due:490172.32-450000,notes:""},
  {chinese:"张家港新澳创金属制品贸易有限公司",english:"Zhangjiagang Xin'aochuang Metal Products Trade Co., Ltd.",desc:"Material",po:"ME 0509",invoice:"✓",purpose:"Material",method:"ZJG Basic-M",amount:16100.00,clearing:"Balance",due:16100.00,notes:"2月 ¥16,100"},
  {chinese:"苏州吉旺达五金贸易有限公司",english:"Suzhou Jiwangda Hardware Trade Co., Ltd.",desc:"Part Procurement",po:"ME 0515",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:72000.00,clearing:"Balance",due:72000.00,notes:""},
  {chinese:"苏州慷达旭机电设备有限公司",english:"Suzhou Kangdaxu Electromechanical Equipment Co., Ltd.",desc:"Part Procurement",po:"ME 0520",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:19400.56,clearing:"Balance",due:19400.56,notes:""},
  {chinese:"苏州慷达旭机电设备有限公司",english:"Suzhou Kangdaxu Electromechanical Equipment Co., Ltd.",desc:"Part Procurement",po:"ME 0521",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:20596.60,clearing:"Balance",due:20596.60,notes:""},
  {chinese:"张家港保税区灵通进出口有限公司",english:"Zhangjiagang FTZ Lingtong Import & Export Co., Ltd.",desc:"Material",po:"ME 0524",invoice:"/",purpose:"Material",method:"ZJG Basic-M",amount:13947.00,clearing:"Balance",due:13947.00,notes:""},
  {chinese:"苏州东麟供应链有限公司",english:"Suzhou Donglin Supply Chain Co., Ltd.",desc:"Shipping",po:"MT 047",invoice:"/",purpose:"Shipping",method:"ZJG Basic-T",amount:59493.00,clearing:"Balance",due:59493.00,notes:""},
  {chinese:"无锡市中大流体工程机械有限公司",english:"Wuxi Zhongda Fluid Engineering Machinery Co., Ltd.",desc:"Part Procurement",po:"ME 0531",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:104200.00,clearing:"Balance",due:104200.00,notes:"4月 ¥204,812.46"},
  {chinese:"苏州慷达旭机电设备有限公司",english:"Suzhou Kangdaxu Electromechanical Equipment Co., Ltd.",desc:"Part Procurement",po:"ME 0532",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:79350.00,clearing:"Balance",due:79350.00,notes:""},
  {chinese:"南京信美电气科技有限公司",english:"Nanjing Xinmei Electrical Technology Co., Ltd.",desc:"Part Procurement",po:"ME 0534",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:2180.00,clearing:"Balance",due:2180.00,notes:""},
  {chinese:"张家港保税区灵通进出口有限公司",english:"Zhangjiagang FTZ Lingtong Import & Export Co., Ltd.",desc:"Material",po:"ME 0542",invoice:"/",purpose:"Material",method:"ZJG Basic-M",amount:4020.00,clearing:"Balance",due:4020.00,notes:""},
  {chinese:"苏州慷达旭机电设备有限公司",english:"Suzhou Kangdaxu Electromechanical Equipment Co., Ltd.",desc:"Part Procurement",po:"ME 0543",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:9096.80,clearing:"Balance",due:9096.80,notes:""},
  {chinese:"张家港市杨舍镇全得福百货商贸中心",english:"Zhangjiagang Yangshe Quandefu Dept. Store",desc:"Consumables",po:"ME 0545",invoice:"/",purpose:"Consumables",method:"ZJG Basic-M",amount:5965.66,clearing:"Balance",due:5965.66,notes:""},
  {chinese:"张家港市华成包装制品有限公司",english:"Zhangjiagang Huacheng Packaging Products Co., Ltd.",desc:"Consumables",po:"ME 0547",invoice:"/",purpose:"Consumables",method:"ZJG Basic-M",amount:3853.70,clearing:"Balance",due:3853.70,notes:"5月 ¥8,428.70"},
  {chinese:"苏州慷达旭机电设备有限公司",english:"Suzhou Kangdaxu Electromechanical Equipment Co., Ltd.",desc:"Part Procurement",po:"ME 0548",invoice:"/",purpose:"Part Procurement",method:"ZJG Basic-M",amount:2595.00,clearing:"Balance",due:2595.00,notes:""},
  {chinese:"张家港市杨舍镇全得福百货商贸中心",english:"Zhangjiagang Yangshe Quandefu Dept. Store",desc:"Consumables",po:"ME 0553",invoice:"/",purpose:"Consumables",method:"ZJG Basic-M",amount:1980.00,clearing:"Balance",due:1980.00,notes:""},
  {chinese:"上海坚迅供应链管理有限公司",english:"Shanghai Jianxun Supply Chain Management Co., Ltd.",desc:"Shipping",po:"ME 0555",invoice:"/",purpose:"Shipping",method:"ZJG Basic-M",amount:2290.00,clearing:"Balance",due:2290.00,notes:""},
]

function fmt(n: number) { return "¥" + n.toLocaleString("en", {minimumFractionDigits:2, maximumFractionDigits:2}) }

export default function PaymentsPage() {
  const [showCn, setShowCn] = useState(false)
  const [search, setSearch] = useState("")
  const [editDue, setEditDue] = useState<Record<number, number>>({})
  const [paid, setPaid] = useState<Record<number, boolean>>({})
  const [collapsed, setCollapsed] = useState(true)
  const [extra, setExtra] = useState<Payment[]>([])

  const q = search.toLowerCase()
  const all = [...payments, ...extra]
  const filtered = all.filter(p =>
    p.english.toLowerCase().includes(q) || p.chinese.includes(q) || p.po.toLowerCase().includes(q) || p.invoice.includes(q)
  )
  const allObjects = all
  const getDue = (i: number, p: Payment) => editDue[i] !== undefined ? editDue[i] : p.due

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="flex items-center justify-between mb-4 no-print">
          <Link href="/documents" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Back</Link>
          <button onClick={() => window.print()} className="rounded-full bg-red-600 text-white px-4 py-1.5 text-xs font-semibold hover:bg-red-700 flex items-center gap-1"><Printer className="h-3 w-3" /> Print</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Pending Payment List</h1>
              <p className="text-xs text-gray-500">Shanghai Mickala Lighting Equipment — {all.length} suppliers · 1 July 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs border rounded-lg w-48 focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
              <button onClick={() => setShowCn(!showCn)} className="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">{showCn ? "Hide" : "Show"} Chinese</button>
              <button onClick={() => setExtra([...extra, {chinese:"",english:"New Supplier",desc:"",po:"",invoice:"",purpose:"",method:"ZJG Basic-M",amount:0,clearing:"Balance",due:0,notes:""}])} className="text-xs px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700">+ Add Supplier</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-2 text-left font-semibold w-7">#</th>
                  <th className="p-2 text-left font-semibold">Supplier</th>
                  <th className="p-2 text-left font-semibold w-20">Type</th>
                  <th className="p-2 text-left font-semibold w-20">PO</th>
                  <th className="p-2 text-left font-semibold w-14">Inv</th>
                  <th className="p-2 text-left font-semibold w-20">Method</th>
                  <th className="p-2 text-right font-semibold w-24">Amount ¥</th>
                  <th className="p-2 text-right font-semibold w-24">Due ¥</th>
                  <th className="p-2 text-center font-semibold w-14">Paid</th>
                  <th className="p-2 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const due = getDue(i, p)
                  const isPaid = paid[i]
                  return (
                    <tr key={i} className={`border-t border-gray-100 hover:bg-gray-50 ${isPaid ? "bg-green-50/50" : ""}`}>
                      <td className="p-2 text-gray-400 font-mono">{i+1}</td>
                      <td className="p-2 font-medium text-gray-900">
                        {showCn ? <>{p.chinese}<br /><span className="text-gray-400 font-normal">{p.english}</span></> : p.english}
                      </td>
                      <td className="p-2 text-gray-600">{p.desc}</td>
                      <td className="p-2 font-mono text-gray-500 text-[10px]">{p.po}</td>
                      <td className="p-2 text-center">{p.invoice === "✓" ? <span className="text-green-600 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                      <td className="p-2"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${p.method === "ZJG Basic-T" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{p.method}</span></td>
                      <td className="p-2 text-right font-mono text-gray-700">{fmt(p.amount)}</td>
                      <td className="p-2 text-right">
                        <input type="number" value={due} onChange={e => setEditDue({...editDue, [i]: Number(e.target.value) || 0})}
                          className={`w-full text-right font-mono border-b border-dashed bg-transparent px-1 py-0.5 focus:outline-none focus:border-red-500 ${isPaid ? "text-green-600 line-through" : "text-gray-900"}`} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="checkbox" checked={!!isPaid} onChange={() => setPaid({...paid, [i]: !isPaid})} className="accent-green-600" />
                      </td>
                      <td className="p-2 text-[10px] text-gray-400">{p.notes}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 border-t pt-4">
            <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-3">
              {collapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />} Bank Summary
            </button>
            {!collapsed && (
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                {[
                  {label:"ZJG Basic-T", balance:146776.82, method:"ZJG Basic-T"},
                  {label:"ZJG Basic-M", balance:624343.47, method:"ZJG Basic-M"},
                ].map(b => {
                  const dueTotal = all.filter(p => p.method === b.method).reduce((s, p, idx) => s + getDue(all.indexOf(p), p), 0)
                  const paidTotal = all.filter((p, idx) => p.method === b.method && paid[all.indexOf(p)]).reduce((s, p, idx) => s + getDue(all.indexOf(p), p), 0)
                  const after = b.balance - dueTotal + paidTotal
                  return (
                    <div key={b.label} className="bg-gray-50 rounded-lg p-4">
                      <div className="font-bold text-gray-900 mb-2">{b.label}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between"><span>Opening Balance</span><span className="font-mono">{fmt(b.balance)}</span></div>
                        <div className="flex justify-between"><span>Total Payments</span><span className="font-mono text-red-600">{fmt(dueTotal)}</span></div>
                        <div className="flex justify-between"><span>Already Paid</span><span className="font-mono text-green-600">{fmt(paidTotal)}</span></div>
                        <div className="flex justify-between font-bold border-t pt-1 mt-1"><span>After Payments</span><span className={`font-mono ${after < 0 ? "text-red-600" : "text-green-600"}`}>{fmt(after)}</span></div>
                      </div>
                    </div>
                  )
                })}
                <div className="bg-gray-900 text-white rounded-lg p-4">
                  <div className="font-bold mb-2">TOTAL</div>
                  <div className="space-y-1 text-gray-300">
                    <div className="flex justify-between"><span>Opening Balance</span><span className="font-mono text-white">{fmt(146776.82 + 624343.47)}</span></div>
                    <div className="flex justify-between"><span>Total Payments Due</span><span className="font-mono text-red-400">{fmt(all.reduce((s, p, i) => s + getDue(i, p), 0))}</span></div>
                    <div className="flex justify-between font-bold border-t border-gray-700 pt-1 mt-1"><span>Balance After</span><span className="font-mono text-white">{fmt((146776.82+624343.47) - all.reduce((s, p, i) => s + getDue(i, p), 0))}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
