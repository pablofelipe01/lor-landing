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
  B2B,
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
        <B2B />
      </main>
      <Footer />
    </>
  )
}
