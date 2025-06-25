import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import Cta from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <Header />

     {/* hero section */}
     <Hero />

      {/* Stats Section */}
    <Stats />

      {/* Features Section */}
    <Features />

      {/* How It Works */}
    <HowItWorks />

      {/* Testimonials */}
    <Testimonials />

      {/* Pricing */}
     <Pricing />

      {/* CTA Section */}
    <Cta />

      {/* Footer */}
    <Footer />
    </div>
  )
}
