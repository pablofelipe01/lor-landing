import {
  Navigation,
  Hero,
  Problem,
  Solution,
  UseCases,
  Comparison,
  Impact,
  Roadmap,
  Funding,
  FAQ,
  Footer,
  // B2B, // Seccion empresarial desactivada temporalmente
} from '@/components'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <UseCases />
        <Comparison />
        <Impact />
        <Roadmap />
        <Funding />
        <FAQ />
        {/* Seccion empresarial desactivada temporalmente
        <B2B />
        */}
      </main>
      <Footer />
    </>
  )
}
