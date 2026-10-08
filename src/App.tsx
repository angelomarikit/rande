import { useCallback, useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TripFinder } from '@/components/TripFinder'
import { Destinations } from '@/components/Destinations'
import { Packages } from '@/components/Packages'
import { PackageModal } from '@/components/PackageModal'
import { WhyRande } from '@/components/WhyRande'
import { About } from '@/components/About'
import { Process } from '@/components/Process'
import { HappyTravelers } from '@/components/HappyTravelers'
import { Testimonials } from '@/components/Testimonials'
import { Gallery } from '@/components/Gallery'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import type { Destination, InquiryPrefill, TourPackage } from '@/types'

function App() {
  const [prefill, setPrefill] = useState<InquiryPrefill | undefined>()
  const [highlightIds, setHighlightIds] = useState<string[] | undefined>()
  const [activePackage, setActivePackage] = useState<TourPackage | null>(null)

  const openInquiry = useCallback((next?: InquiryPrefill) => {
    setPrefill(next)
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const handleDestination = useCallback((destination: Destination) => {
    if (destination.relatedPackageIds?.length) {
      setHighlightIds(destination.relatedPackageIds)
    }
  }, [])

  return (
    <>
      <JsonLd />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ocean-navy"
      >
        Skip to content
      </a>
      <Header onPlanTrip={() => openInquiry()} />
      <main id="main">
        <Hero
          onExplorePackages={() =>
            document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
          }
          onPlanTrip={() => openInquiry()}
        />
        <TripFinder
          onMatchPackages={setHighlightIds}
          onInquiry={openInquiry}
        />
        <Destinations onSelect={handleDestination} onInquiry={openInquiry} />
        <Packages
          highlightIds={highlightIds}
          onViewDetails={setActivePackage}
          onInquire={openInquiry}
        />
        <WhyRande />
        <About />
        <Process />
        <HappyTravelers
          onOpenGallery={() =>
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <Testimonials />
        <Gallery />
        <FAQ />
        <FinalCTA
          onPlanTrip={() => openInquiry()}
          onExplore={() =>
            document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <PackageModal
        pkg={activePackage}
        onClose={() => setActivePackage(null)}
        onInquire={openInquiry}
      />
    </>
  )
}

export default App
