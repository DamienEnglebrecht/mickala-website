"use client"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
  guarantors: { name: string; address: string; phone: string; email: string; relationship: string }[];
  signatoryName: string; signatoryTitle: string; signatoryDate: string;
  agreedToTerms: boolean;
  idType: string; idNumber: string; idExpiry: string;
  verificationCode: string; verified: boolean;
  mickalaName: string; mickalaTitle: string; mickalaDate: string; mickalaNotes: string;
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
  guarantors: [{ name: "", address: "", phone: "", email: "", relationship: "" }],
  signatoryName: "", signatoryTitle: "", signatoryDate: "",
  agreedToTerms: false,
  idType: "", idNumber: "", idExpiry: "",
  verificationCode: "", verified: false,
  mickalaName: "", mickalaTitle: "", mickalaDate: "", mickalaNotes: ""
}

const steps = [
  "Entity", "Applicant", "Directors", "Partners", "Trust", "Banking", "Credit", "Guarantor", "Declaration"
]

export default function CreditAppPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [printingFull, setPrintingFull] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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
  const updateGuarantor = (i: number, field: string, value: string) => {
    const d = [...form.guarantors]; d[i] = { ...d[i], [field]: value }; update("guarantors", d)
  }

  const addDir = () => update("directors", [...form.directors, { name: "", address: "", phone: "", email: "" }])
  const addRef = () => update("tradeRefs", [...form.tradeRefs, { name: "", phone: "", accountNo: "", creditLimit: "", tradingYears: "" }])
  const addGuarantor = () => update("guarantors", [...form.guarantors, { name: "", address: "", phone: "", email: "", relationship: "" }])

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"

  const nextStep = () => { setStep(s => Math.min(steps.length - 1, s + 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }
  const prevStep = () => { setStep(s => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }

  const submitApp = async () => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/credit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        alert("Credit application submitted successfully! A copy has been sent to management@mickala.com.au. Our team will review and contact you.")
        window.print()
      } else {
        alert("Submission failed: " + (data.error || "Unknown error"))
      }
    } catch (err: any) {
      alert("Submission error: " + err.message)
    }
    setSubmitting(false)
  }

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
      <style>{`
        @media print { @page { margin: 12mm 8mm; } }
        .page-break { page-break-before: always; }
      `}</style>

      {/* ===== MAIN FORM (hidden when printing full) ===== */}
      <div className={`max-w-3xl mx-auto p-4 sm:p-8 ${printingFull ? 'hidden' : ''}`}>
        <Link href="/" onClick={(e) => { e.preventDefault(); router.back() }} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>

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

                {/* Identity Verification */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3 mt-4">
                  <h3 className="text-sm font-bold text-amber-900">Identity Verification</h3>
                  <p className="text-xs text-amber-700">Provide one form of identification to verify the applicant's identity.</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">ID Type <span className="text-red-600">*</span></label>
                      <select value={form.idType} onChange={e => update("idType", e.target.value)} className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30">
                        <option value="">Select...</option>
                        <option value="Drivers Licence">Driver's Licence</option>
                        <option value="Passport">Passport</option>
                        <option value="Proof of Age Card">Proof of Age Card</option>
                        <option value="Other Govt ID">Other Government ID</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">ID Number <span className="text-red-600">*</span></label>
                      <input type="text" value={form.idNumber} onChange={e => update("idNumber", e.target.value)} className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">Expiry Date</label>
                      <input type="date" value={form.idExpiry} onChange={e => update("idExpiry", e.target.value)} className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30" />
                    </div>
                  </div>
                </div>

                {/* Email Verification */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                  <h3 className="text-sm font-bold text-blue-900">Email Verification</h3>
                  <p className="text-xs text-blue-700">We'll send a verification code to {form.email || "the email above"}.</p>
                  <div className="flex items-center gap-3">
                    <input type="text" value={form.verificationCode} onChange={e => update("verificationCode", e.target.value)} placeholder="Enter verification code" className="flex-1 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                    <button onClick={() => {
                      const code = Math.floor(100000 + Math.random() * 900000).toString();
                      alert(`[DEV MODE] Verification code for ${form.email}: ${code}\n\nIn production, this will be emailed automatically.`);
                      update("verificationCode", "");
                      prompt("Enter the verification code shown above:", "");
                    }} className="shrink-0 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
                      Send Code
                    </button>
                  </div>
                  {form.verificationCode && form.verificationCode.length > 0 && (
                    <p className="text-xs text-green-700 font-medium flex items-center gap-1">✓ Code entered (verification will occur on submission)</p>
                  )}
                </div>
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
                <h3 className="font-semibold text-sm mt-4">Trade References <span className="text-[11px] text-gray-400 font-normal">(Minimum of 3 required)</span></h3>
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
                <h2 className="text-lg font-bold mb-2">Guarantor</h2>
                <p className="text-xs text-muted-foreground mb-3">Personal guarantee for the credit facility (if applicable)</p>
                {form.guarantors.map((g, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3 border">
                    <p className="text-xs font-semibold text-primary">Guarantor {i + 1}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {inputSimple(g.name, v => updateGuarantor(i, "name", v), "Full name")}
                      {inputSimple(g.relationship, v => updateGuarantor(i, "relationship", v), "Relationship to applicant")}
                      {inputSimple(g.address, v => updateGuarantor(i, "address", v), "Address")}
                      {inputSimple(g.phone, v => updateGuarantor(i, "phone", v), "Phone")}
                      {inputSimple(g.email, v => updateGuarantor(i, "email", v), "Email")}
                    </div>
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs font-medium text-amber-800">Guarantor Declaration</p>
                      <p className="text-[11px] text-amber-700 mt-1">I/We irrevocably and unconditionally guarantee to Mickala Group the due and punctual payment of all moneys which may be owing by the applicant. This is a continuing obligation and shall not be affected by any variation or extension of credit.</p>
                    </div>
                  </div>
                ))}
                <button onClick={addGuarantor} className="text-sm text-primary font-medium hover:underline">+ Add guarantor</button>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Declaration & Signature</h2>

                {/* Insolvency Protections */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800 space-y-2">
                  <p className="font-semibold text-sm text-red-900">Credit Terms & Protections</p>
                  <p>1. <strong>Retention of Title:</strong> All goods supplied by Mickala Group remain the property of Mickala Group until full payment has been received. If the customer enters administration, liquidation or any form of insolvency, Mickala Group retains the right to enter any premises and repossess all unpaid goods.</p>
                  <p>2. <strong>PPSR Security Interest:</strong> The customer grants Mickala Group a security interest in all goods supplied and the proceeds thereof. Mickala Group may register a security interest on the Personal Property Securities Register (PPSR) and the customer waives their right to receive a verification statement.</p>
                  <p>3. <strong>Default & Recovery Costs:</strong> If the customer defaults on payment, all outstanding amounts become immediately due and payable. The customer is liable for all reasonable costs incurred by Mickala Group in recovering unpaid amounts, including debt collection fees and legal costs on a full indemnity basis.</p>
                  <p>4. <strong>Suspension of Supply:</strong> Mickala Group reserves the right to suspend or cancel all further supply of goods and services immediately if the customer fails to make payment when due, exceeds the agreed credit limit, or becomes insolvent.</p>
                  <p>5. <strong>No Set-Off:</strong> The customer has no right of set-off against any amounts due to Mickala Group. The customer cannot assign or transfer any rights or obligations under this agreement without Mickala Group's written consent.</p>
                </div>

                {/* Agree to terms checkbox */}
                <label className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl cursor-pointer hover:bg-red-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.agreedToTerms}
                    onChange={e => update("agreedToTerms", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <div className="text-xs text-red-800">
                    <span className="font-semibold">I acknowledge and agree</span> to the Credit Terms & Protections outlined above, including the Retention of Title, PPSR Security Interest, Default & Recovery Costs, Suspension of Supply, and No Set-Off provisions.
                  </div>
                </label>

                {form.agreedToTerms && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    <p className="font-medium">Declaration</p>
                    <p className="mt-1 text-xs">I/We declare that the information provided is true and correct. I/We authorise Mickala Group to verify the information provided and obtain credit references. I/We agree to abide by Mickala Group's trading terms and conditions and have read and agreed to the Credit Terms & Protections above.</p>
                  </div>
                )}

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

                {/* Audit Trail */}
                <div className="bg-gray-50 rounded-xl p-3 border text-[10px] text-gray-400 space-y-0.5">
                  <p className="font-medium text-gray-500">Audit Trail</p>
                  <p>IP Address: <span id="audit-ip">Detecting...</span></p>
                  <p>Browser: <span id="audit-browser">{typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 80) : ''}</span></p>
                  <p>Timestamp: {new Date().toLocaleString("en-AU", {day:"numeric", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit"})}</p>
                </div>

                <script dangerouslySetInnerHTML={{__html: `
                  fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(d=>{
                    document.getElementById('audit-ip').textContent = d.ip;
                  }).catch(()=>{
                    document.getElementById('audit-ip').textContent = 'Unable to detect';
                  });
                `}} />

                {/* ===== MICKALA APPROVAL ===== */}
                <hr className="border-primary my-6" />
                <p className="text-xs font-semibold text-primary text-center uppercase tracking-wider mb-4">For Internal Use Only — Mickala Group Approval</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-green-900">Credit Application Approval</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-green-800">Approved By <span className="text-red-600">*</span></label>
                      <input type="text" value={form.mickalaName} onChange={e => update("mickalaName", e.target.value)} placeholder="Full name" className="w-full rounded-lg border border-green-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-green-800">Title / Position</label>
                      <input type="text" value={form.mickalaTitle} onChange={e => update("mickalaTitle", e.target.value)} placeholder="e.g. Credit Manager" className="w-full rounded-lg border border-green-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-green-800">Date</label>
                      <input type="date" value={form.mickalaDate} onChange={e => update("mickalaDate", e.target.value)} className="w-full rounded-lg border border-green-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-green-800">Notes / Decision</label>
                    <input type="text" value={form.mickalaNotes} onChange={e => update("mickalaNotes", e.target.value)} placeholder="e.g. Approved - credit limit $50,000, payment terms 30 days EOM" className="w-full rounded-lg border border-green-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30" />
                  </div>
                  <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-green-800 mb-2">Mickala Authorised Signatory</p>
                    <div className="h-16 border-2 border-dashed border-green-300 rounded-lg flex items-center justify-center text-xs text-green-500">
                      Sign here (print and sign for now)
                    </div>
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
                <div className="flex gap-2">
                  <button onClick={() => window.print()} className="inline-flex items-center gap-1 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">Print / Save PDF <Check className="h-4 w-4" /></button>
                  <button onClick={submitApp} disabled={submitting} className="inline-flex items-center gap-1 rounded-lg bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {submitting ? "Submitting..." : "Submit Application"} <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== FULL PRINT VIEW ===== */}
      {printingFull && (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <div className="text-center mb-8">
            <Image src="/logo-mickala.png" alt="Mickala Group" width={60} height={60} className="mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-primary">Credit Application</h1>
            <p className="text-xs text-gray-500">Mickala Group — ABN 92 180 218 353</p>
          </div>
          <table className="w-full text-xs mb-4"><tbody>
            <tr><td className="font-semibold py-1 pr-4 w-40">Entity Type</td><td>{form.entityType}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Trading Name</td><td>{form.tradingName}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">ABN</td><td>{form.abn}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">ACN</td><td>{form.acn}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Address</td><td>{form.registeredAddress}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Phone</td><td>{form.phone}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Email</td><td>{form.email}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Website</td><td>{form.website}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Business Type</td><td>{form.businessType}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Years Established</td><td>{form.yearsEstablished}</td></tr>
          </tbody></table>
          <div className="page-break"></div>
          <hr className="border-gray-300 mb-4" />
          <h2 className="text-sm font-bold mb-3">Banking & Credit</h2>
          <table className="w-full text-xs mb-4"><tbody>
            <tr><td className="font-semibold py-1 pr-4 w-40">Bank</td><td>{form.bankName} BSB {form.bankBsb} Acc {form.bankAccount}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Account Name</td><td>{form.bankAccountName}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Credit Amount</td><td>{form.creditAmount}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Credit Terms</td><td>{form.creditTerms}</td></tr>
          </tbody></table>
          <div className="page-break"></div>
          <hr className="border-gray-300 mb-4" />
          <h2 className="text-sm font-bold mb-3">Declaration & Signature</h2>
          <table className="w-full text-xs mb-4"><tbody>
            <tr><td className="font-semibold py-1 pr-4 w-40">Signatory Name</td><td>{form.signatoryName}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Title</td><td>{form.signatoryTitle}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Date</td><td>{form.signatoryDate}</td></tr>
            <tr><td className="font-semibold py-1 pr-4">Agreed to Terms</td><td>{form.agreedToTerms ? "Yes" : "No"}</td></tr>
          </tbody></table>
          <p className="text-center text-xs text-gray-400 mt-8">Mickala Group | 1300 642 525 | accounts@mickala.com.au | www.mickalagroup.com.au</p>
        </div>
      )}
    </div>
  )
}