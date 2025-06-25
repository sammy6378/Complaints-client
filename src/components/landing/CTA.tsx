import { ArrowRight } from "lucide-react"


function Cta() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get Your Issues Resolved?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied users who've successfully resolved their
            complaints with ResolveIt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center group">
              Start Resolving Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta