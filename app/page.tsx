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
      </main>
      <Footer />
    </>
  )
}
