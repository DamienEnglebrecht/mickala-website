"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Download, ChevronDown, ChevronUp } from "lucide-react"

const sections = [
  {
    id: "definitions",
    title: "1. Definitions and Interpretation",
    content: `1.1 "Contract" means these Standard Terms and Conditions together with the Quotation and any Purchase Order accepted by Mickala.
1.2 "Equipment" means the lighting towers, plant, machinery, accessories and any other items supplied by Mickala under the Contract.
1.3 "Hirer" means the party hiring the Equipment from Mickala as named in the Quotation or Purchase Order.
1.4 "Mickala" means Mickala Mining Maintenance Pty Ltd ATF The Englebrecht Family Trust (ABN 92 180 218 353).
1.5 "Hire Period" means the period from delivery of the Equipment to the Hirer until its return to Mickala.
1.6 "Quotation" means the written quote provided by Mickala to the Hirer.
1.7 "Purchase Order" means the Hirer's order issued in response to Mickala's Quotation.
1.8 "Site" means the location where the Equipment is to be used.
1.9 "Total Loss" means damage to the Equipment requiring replacement or where the cost of repair exceeds 60% of the Equipment's insured value.`
  },
  {
    id: "application",
    title: "2. Application of Terms",
    content: `2.1 These Standard Terms and Conditions apply to all contracts, agreements, hires and dealings between Mickala and the Hirer.
2.2 By accepting a Quotation or issuing a Purchase Order, the Hirer is deemed to have accepted these Standard Terms and Conditions.
2.3 These terms prevail over any inconsistent terms in the Hirer's Purchase Order or other documentation unless expressly agreed in writing by a director of Mickala.
2.4 No variation of these terms is effective unless confirmed in writing by a director of Mickala.`
  },
  {
    id: "quotations",
    title: "3. Quotations and Orders",
    content: `3.1 Each Quotation is valid for 30 days from the date of issue unless otherwise stated.
3.2 A contract is formed when the Hirer accepts a Quotation by written notice or Purchase Order, or when Mickala commences performance of the Hirer's order.
3.3 Mickala reserves the right to reject any Purchase Order at its discretion.`
  },
  {
    id: "hire-period",
    title: "4. Hire Period and Charges",
    content: `4.1 The Hire Period commences when the Equipment leaves Mickala's premises or is delivered to the Hirer, whichever occurs first.
4.2 The Hire Period ends when the Equipment is returned to Mickala's premises and inspected.
4.3 Hire charges are calculated on a daily, weekly or monthly basis as specified in the Quotation, with minimum hire periods as stated.
4.4 Mickala may vary hire charges on 30 days written notice to the Hirer.
4.5 All charges are exclusive of GST, which will be added to all invoices at the prevailing rate.
4.6 The Hirer must pay a refundable security deposit if required by Mickala.`
  },
  {
    id: "payment",
    title: "5. Payment Terms",
    content: `5.1 Invoices are payable within the terms specified in the Quotation (default: 30 days from end of month).
5.2 Overdue amounts attract interest at 14% per annum calculated daily.
5.3 The Hirer must pay all amounts without set-off, deduction or counterclaim unless required by law.
5.4 Mickala may suspend performance or repossess Equipment if amounts remain unpaid after 14 days.
5.5 The Hirer is responsible for all collection and recovery costs, including legal fees, for overdue amounts.`
  },
  {
    id: "delivery",
    title: "6. Delivery and Collection",
    content: `6.1 Delivery and collection costs are as specified in the Quotation and are payable by the Hirer.
6.2 Risk in the Equipment passes to the Hirer upon delivery and remains with the Hirer until the Equipment is returned to Mickala's premises and inspected.
6.3 The Hirer must provide safe and reasonable access for delivery and collection.
6.4 The Hirer is responsible for obtaining all necessary permits, site access and approvals for delivery, use and collection of the Equipment.
6.5 Any delay in delivery or collection caused by the Hirer will result in additional charges at the applicable hire rate.`
  },
  {
    id: "hirer-obligations",
    title: "7. Hirer's Obligations During Hire",
    content: `7.1 The Hirer must:
(a) pay all charges on time;
(b) keep the Equipment in good working order and condition at all times;
(c) operate the Equipment in accordance with the operator's manual and all applicable laws;
(d) ensure only trained and authorised personnel operate the Equipment;
(e) maintain all fluid levels, clean the Equipment regularly, and keep it free of mud, debris and contaminants;
(f) immediately report any damage, fault, malfunction or accident involving the Equipment;
(g) not make any alterations, modifications or repairs without Mickala's prior written consent;
(h) not remove the Equipment from the Site without Mickala's prior written consent;
(i) permit Mickala to inspect the Equipment at any time upon reasonable notice;
(j) comply with all site safety requirements, laws and regulations;
(k) not create any encumbrance, lien or security interest over the Equipment;
(l) provide hourly readings weekly or as requested by Mickala;
(m) secure the Equipment against theft, vandalism and unauthorised use.`
  },
  {
    id: "maintenance",
    title: "8. Maintenance and Repairs",
    content: `8.1 The Hirer must carry out all routine servicing as specified by Mickala at the Hirer's cost.
8.2 The Hirer must notify Mickala immediately of any breakdown or malfunction.
8.3 Minor repairs (under $1,500 including parts and labour) may be carried out by the Hirer with Mickala's prior approval. Mickala will reimburse approved minor repair costs.
8.4 Major repairs ($1,500 or more) must be authorised by Mickala in writing and will be carried out by Mickala or its nominated agent.
8.5 Damage caused by the Hirer's misuse, abuse, negligence or breach of the Contract will be repaired at the Hirer's full cost.`
  },
  {
    id: "return",
    title: "9. Return of Equipment",
    content: `9.1 Upon expiry or termination of the Hire Period, the Hirer must:
(a) notify Mickala and arrange for collection;
(b) thoroughly clean the Equipment inside and out, including removing all mud, dirt, grease and debris;
(c) fill all fuel tanks to full capacity;
(d) ensure all fluids (oil, coolant, hydraulic) are at correct levels;
(e) return all keys, remotes, chargers, manuals and accessories;
(f) make the Equipment available for inspection by Mickala;
(g) provide access for collection during normal business hours.
9.2 If the Equipment is not returned in accordance with clause 9.1, Mickala may charge the Hirer for cleaning, refuelling and any associated costs at Mickala's standard rates.
9.3 Hire charges continue until the Equipment is returned to Mickala's premises and inspected, even if the Hirer has stopped using the Equipment.
9.4 If the Equipment is not returned within 14 days of the end of the Hire Period, Mickala may repossess the Equipment without further notice and may enter any premises to do so.`
  },
  {
    id: "damage-loss",
    title: "10. Damage, Loss and Total Loss",
    content: `10.1 The Hirer is liable for all damage to the Equipment during the Hire Period, however caused, except for fair wear and tear.
10.2 The Hirer must immediately notify Mickala of any damage, loss or Total Loss.
10.3 In the case of damage that can be repaired, the Hirer must pay:
(a) the cost of repairs including parts, labour and transport; and
(b) hire charges for the period the Equipment is out of service for repairs.
10.4 In the case of Total Loss, the Hirer must pay:
(a) the insured value of the Equipment as specified in the Quotation (or market value if not specified); and
(b) all hire charges up to the date of the Total Loss.
10.5 Upon payment of the Total Loss amount, ownership of the damaged Equipment passes to the Hirer.
10.6 The Hirer remains liable for the Equipment until it is returned to Mickala's premises, irrespective of any claim against a third party.`
  },
  {
    id: "insurance",
    title: "11. Insurance",
    content: `11.1 The Hirer must maintain at its own cost:
(a) public liability insurance of at least $20,000,000 per occurrence;
(b) workers' compensation insurance as required by law;
(c) insurance for the full replacement value of the Equipment.
11.2 The Hirer must provide certificates of insurance to Mickala upon request.
11.3 All insurance policies must be noted to waive rights of subrogation against Mickala.
11.4 Failure to maintain insurance does not limit the Hirer's liability under these terms.`
  },
  {
    id: "indemnity",
    title: "12. Indemnity",
    content: `12.1 The Hirer indemnifies Mickala against all losses, damages, claims, costs and expenses (including legal fees) arising out of or in connection with:
(a) the Hirer's use, possession, operation, handling or storage of the Equipment;
(b) any breach of the Contract by the Hirer;
(c) any negligent, unlawful or wrongful act or omission of the Hirer or the Hirer's personnel;
(d) any damage to or loss of the Equipment however caused (except fair wear and tear);
(e) any injury to or death of any person or damage to any property arising from the Equipment.
12.2 This indemnity continues after termination of the Contract.`
  },
  {
    id: "title",
    title: "13. Title and Security",
    content: `13.1 Title in the Equipment remains with Mickala at all times. The Hirer is a bailee only.
13.2 The Hirer must not sell, assign, mortgage, pledge or otherwise deal with the Equipment.
13.3 If the Contract creates a security interest under the PPSA, the Hirer agrees to do all things reasonably required by Mickala to perfect that security interest.
13.4 The Hirer must keep the Equipment free from any encumbrance and immediately notify Mickala of any claim affecting the Equipment.`
  },
  {
    id: "default",
    title: "14. Default and Termination",
    content: `14.1 Mickala may terminate the Contract and repossess the Equipment immediately if:
(a) the Hirer fails to pay any amount when due;
(b) the Hirer breaches any term of the Contract and fails to remedy within 7 days of notice;
(c) the Hirer becomes insolvent, has a receiver appointed, or enters liquidation;
(d) the Equipment is seized, threatened with seizure or at risk of confiscation;
(e) the Hirer does anything that may prejudice Mickala's ownership of the Equipment.
14.2 Upon termination, all amounts payable by the Hirer become immediately due and payable.
14.3 Termination does not affect any rights or remedies that have accrued.`
  },
  {
    id: "limitation",
    title: "15. Limitation of Liability",
    content: `15.1 To the maximum extent permitted by law, Mickala's liability for any loss or damage arising from the Contract is limited to the amount paid by the Hirer under the Contract.
15.2 Mickala is not liable for any consequential, indirect or special loss or damage, including loss of profits, loss of production, loss of business opportunity or loss of revenue.
15.3 Nothing in this clause excludes or limits liability for:
(a) death or personal injury caused by negligence;
(b) fraud or fraudulent misrepresentation;
(c) any liability that cannot be excluded by law (including under the Australian Consumer Law).`
  },
  {
    id: "general",
    title: "16. General Provisions",
    content: `16.1 Governing Law: The Contract is governed by the laws of Queensland, Australia.
16.2 Disputes: If a dispute arises, the parties must attempt to resolve it through negotiation before commencing legal proceedings.
16.3 Notices: Notices must be in writing and sent to the addresses specified in the Quotation.
16.4 Entire Agreement: The Contract constitutes the entire agreement between the parties and supersedes all prior communications.
16.5 Severance: If any provision is held invalid, the remaining provisions continue in full force.
16.6 Waiver: No waiver of any right is effective unless in writing and signed by the party granting it.
16.7 Force Majeure: Neither party is liable for failure to perform due to events beyond its reasonable control.`
  },
]

export default function StandardTermsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setOpenSections(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-2">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6 no-print">
          <Link href="/documents" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-800">
            <ArrowLeft className="h-3 w-3 mr-1" /> Back to Documents
          </Link>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="rounded-full bg-primary text-white px-4 py-1.5 text-xs font-semibold hover:bg-primary/90 flex items-center gap-1">
              <Printer className="h-3 w-3" /> Print / PDF
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <Image src="/logo-mickala.png" alt="Mickala" width={72} height={72} className="h-16 w-auto" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Mickala Standard Terms and Conditions</h1>
              <p className="text-sm text-gray-500 mt-1">For the hire of lighting towers, plant and equipment</p>
              <p className="text-[10px] text-gray-400 mt-2">Document ref: MM-LE-TP-001 | Version 1.0 | Effective July 2026</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-4 text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-gray-800">These Standard Terms and Conditions apply to all hires, contracts and dealings with Mickala.</p>
            <p>By accepting a quotation, issuing a purchase order, or taking delivery of equipment, the Hirer accepts these terms.</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Mickala Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600">
            <div>
              <p className="font-semibold">QLD Office:</p>
              <p>21 Caterpillar Drive, Paget QLD 4740</p>
              <p>Phone: 07 4998 5447</p>
            </div>
            <div>
              <p className="font-semibold">NSW Office:</p>
              <p>37 Thomas Mitchell Drive, Muswellbrook NSW 2333</p>
              <p>Phone: 02 5542 0000</p>
            </div>
            <div>
              <p className="font-semibold">General Enquiries:</p>
              <p>1300 642 525</p>
              <p>letisha@mickala.com.au</p>
            </div>
            <div>
              <p className="font-semibold">Website:</p>
              <p>mickalagroup.com.au</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="space-y-2">
          {sections.map(s => {
            const isOpen = openSections[s.id] ?? (s.id === "return" || s.id === "damage-loss" || s.id === "hirer-obligations")
            return (
              <div key={s.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggle(s.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-800">{s.title}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{s.content}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Key Clauses Callout */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="text-xs font-bold text-amber-800 mb-2">Key Clauses for Demobilisation</h3>
          <div className="space-y-2 text-xs text-amber-700">
            <p><strong>Clause 9 (Return of Equipment):</strong> Equipment must be returned clean, with full fuel tanks and correct fluid levels. Cleaning and refuelling charges apply if not complied with.</p>
            <p><strong>Clause 10 (Damage and Loss):</strong> The Hirer is liable for all damage during the Hire Period. Total Loss requires payment of the insured value.</p>
            <p><strong>Clause 2 (Application):</strong> These terms are accepted by conduct — accepting a quotation or issuing a purchase order binds the Hirer.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[9px] text-gray-400 border-t border-gray-200 pt-4">
          <p>Document: MM-LE-TP-001 | Version 1.0 | Effective July 2026</p>
          <p className="mt-0.5">Mickala Mining Maintenance Pty Ltd ATF The Englebrecht Family Trust (ABN 92 180 218 353)</p>
          <p className="mt-0.5">© 2026 Mickala Group — All rights reserved. Uncontrolled if printed.</p>
        </div>
      </div>
    </div>
  )
}
