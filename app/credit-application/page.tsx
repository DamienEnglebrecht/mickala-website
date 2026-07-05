"use client"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, ChevronLeft, Check } from "lucide-react"

type FormData = {
  entityType: string; tradingName: string; abn: string; acn: string;
  registeredAddress: string; postalAddress: string; phone: string; email: string;
  website: string; businessType: string; yearsEstablished: string;
  directors: { name: string; address: string; phone: string; email: string }[];
  partners: { name: string; address: string; phone: string; email: string }[];
  trustName: string; trustAbn: string; trustAcn: string; trustAfsl: string;
  bankName: string; bankBsb: string; bankAccount: string; bankAccountName: string;
  creditAmount: string; creditTerms: string;
  tradeRefs: { name: string; phone: string; accountNo: string; creditLimit: string; tradingYears: string }[];
  signatoryName: string; signatoryTitle: string; signatoryDate: string;
}

const initialForm: FormData = {
  entityType: "Company", tradingName: "", abn: "", acn: "",
  registeredAddress: "", postalAddress: "", phone: "", email: "",
  website: "", businessType: "", yearsEstablished: "",
  directors: [{ name: "", address: "", phone: "", email: "" }],
  partners: [{ name: "", address: "", phone: "", email: "" }],
  trustName: "", trustAbn: "", trustAcn: "", trustAfsl: "",
  bankName: "", bankBsb: "", bankAccount: "", bankAccountName: "",
  creditAmount: "", creditTerms: "",
  tradeRefs: [{ name: "", phone: "", accountNo: "", creditLimit: "", tradingYears: "" }],
  signatoryName: "", signatoryTitle: "", signatoryDate: ""
}

const steps = [
  "Entity", "Applicant", "Directors", "Partners", "Trust", "Banking", "Credit", "Declaration"
]

export default function CreditAppPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const formRef = useRef<HTMLDivElement>(null)

  const update = (field: keyof FormData, value: any) => setForm(f => ({ ...f, [field]: value }))

  const updateDir = (i: number, field: string, value: string) => {
    const d = [...form.directors]; d[i] = { ...d[i], [field]: value }; update("directors", d)
  }
  const updatePartner = (i: number, field: string, value: string) => {
    const d = [...form.partners]; d[i] = { ...d[i], [field]: value }; update("partners", d)
  }
  const updateRef = (i: number, field: string, value: string) => {
    const d = [...form.tradeRefs]; d[i] = { ...d[i], [field]: value }; update("tradeRefs", d)
  }

  const addDir = () => update("directors", [...form.directors, { name: "", address: "", phone: "", email: "" }])
  const addRef = () => update("tradeRefs", [...form.tradeRefs, { name: "", phone: "", accountNo: "", creditLimit: "", tradingYears: "" }])

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"

  const nextStep = () => { setStep(s => Math.min(steps.length - 1, s + 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }
  const prevStep = () => { setStep(s => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }

  const Field = ({ label, field, type = "text", required = false }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-foreground">{label}{required && <span className="text-primary ml-0.5">*</span>}</label>
      <input type={type} value={form[field as keyof FormData]} onChange={e => update(field, e.target.value)} className={inputClass} required={required} />
    </div>
  )

  const inputSimple = (value: string, onChange: (v: string) => void, placeholder = "") => (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>

        <div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo-mickala.png" alt="Mickala Group" width={40} height={40} className="h-10 w-auto" />
            <div><h1 className="text-xl font-bold">Credit Application</h1><p className="text-xs text-muted-foreground">Mickala Group — Complete the form to apply for trade credit</p></div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-0.5 mb-8 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === step ? "bg-primary text-white" : i < step ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                  {i < step ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && <div className="h-px w-4 bg-gray-200 mx-0.5" />}
              </div>
            ))}
          </div>

          <div ref={formRef}>
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Apply For Credit With</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Company", "Individual", "Partnership", "Trust", "Joint Venture", "Other"].map(t => (
                    <button key={t} onClick={() => update("entityType", t)}
                      className={`py-3 px-3 rounded-xl border text-sm font-medium transition-colors ${form.entityType === t ? "border-primary bg-primary/5 text-primary" : "border-input hover:border-gray-300"}`}>{t}</button>
                  ))}
                </div>
                <Field label="Trading Name" field="tradingName" required />
                <div className="grid grid-cols-2 gap-4"><Field label="ABN" field="abn" /><Field label="ACN" field="acn" /></div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Applicant Particulars</h2>
                <Field label="Registered Address" field="registeredAddress" required />
                <Field label="Postal Address (if different)" field="postalAddress" />
                <div className="grid grid-cols-2 gap-4"><Field label="Phone" field="phone" /><Field label="Email" field="email" type="email" /></div>
                <div className="grid grid-cols-3 gap-4"><Field label="Website" field="website" /><Field label="Business Type" field="businessType" /><Field label="Years Established" field="yearsEstablished" /></div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Directors / Principals</h2>
                {form.directors.map((d, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3 border">
                    <p className="text-xs font-semibold text-primary">Director {i + 1}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {inputSimple(d.name, v => updateDir(i, "name", v), "Full name")}
                      {inputSimple(d.address, v => updateDir(i, "address", v), "Address")}
                      {inputSimple(d.phone, v => updateDir(i, "phone", v), "Phone")}
                      {inputSimple(d.email, v => updateDir(i, "email", v), "Email")}
                    </div>
                  </div>
                ))}
                <button onClick={addDir} className="text-sm text-primary font-medium hover:underline">+ Add director</button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Partners / Business Owners</h2>
                <p className="text-xs text-muted-foreground">If applicable</p>
                {form.partners.map((p, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3 border">
                    <p className="text-xs font-semibold text-primary">Partner {i + 1}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {inputSimple(p.name, v => updatePartner(i, "name", v), "Full name")}
                      {inputSimple(p.address, v => updatePartner(i, "address", v), "Address")}
                      {inputSimple(p.phone, v => updatePartner(i, "phone", v), "Phone")}
                      {inputSimple(p.email, v => updatePartner(i, "email", v), "Email")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Trust Details</h2>
                <p className="text-xs text-muted-foreground">If applicable</p>
                <Field label="Trust Name" field="trustName" />
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Trust ABN" field="trustAbn" />
                  <Field label="Trust ACN" field="trustAcn" />
                  <Field label="AFSL (if applicable)" field="trustAfsl" />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Banking Details</h2>
                <Field label="Bank Name" field="bankName" required />
                <div className="grid grid-cols-3 gap-4">
                  <Field label="BSB" field="bankBsb" />
                  <Field label="Account Number" field="bankAccount" />
                  <Field label="Account Name" field="bankAccountName" />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Credit Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Credit Amount Requested" field="creditAmount" />
                  <Field label="Preferred Payment Terms" field="creditTerms" />
                </div>
                <h3 className="font-semibold text-sm mt-4">Trade References</h3>
                {form.tradeRefs.map((r, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3 border">
                    <p className="text-xs font-semibold text-primary">Reference {i + 1}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {inputSimple(r.name, v => updateRef(i, "name", v), "Supplier name")}
                      {inputSimple(r.phone, v => updateRef(i, "phone", v), "Phone")}
                      {inputSimple(r.accountNo, v => updateRef(i, "accountNo", v), "Account No")}
                      {inputSimple(r.creditLimit, v => updateRef(i, "creditLimit", v), "Credit limit")}
                      {inputSimple(r.tradingYears, v => updateRef(i, "tradingYears", v), "Years trading")}
                    </div>
                  </div>
                ))}
                <button onClick={addRef} className="text-sm text-primary font-medium hover:underline">+ Add reference</button>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Declaration & Signature</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  <p className="font-medium">Declaration</p>
                  <p className="mt-1 text-xs">I/We declare that the information provided is true and correct. I/We authorise Mickala Group to verify the information provided and obtain credit references. I/We agree to abide by Mickala Group's trading terms and conditions.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Full Name" field="signatoryName" required />
                  <Field label="Title / Position" field="signatoryTitle" required />
                  <Field label="Date" field="signatoryDate" type="date" required />
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border text-center">
                  <p className="text-sm font-medium mb-2">Signature</p>
                  <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                    Sign here (electronic signature coming soon — print and sign for now)
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button onClick={prevStep} disabled={step === 0} className="inline-flex items-center gap-1 rounded-lg border border-input px-4 py-2 text-sm disabled:opacity-30 hover:bg-gray-50"><ChevronLeft className="h-4 w-4" /> Back</button>
              {step < steps.length - 1 ? (
                <button onClick={nextStep} className="inline-flex items-center gap-1 rounded-lg bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Next <ChevronRight className="h-4 w-4" /></button>
              ) : (
                <button onClick={() => window.print()} className="inline-flex items-center gap-1 rounded-lg bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Print / Save PDF <Check className="h-4 w-4" /></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}