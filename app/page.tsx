import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Products } from "@/components/products"
import { About } from "@/components/about"
import { OtherProducts } from "@/components/other-products"
import { WhyMickala } from "@/components/why-mickala"
import { Support } from "@/components/support"
import { Clients } from "@/components/clients"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Products />
        <About />
        <OtherProducts />
        <WhyMickala />
        <Support />
        <Clients />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
