import { CheckCircle, Clock, MessageCircle } from 'lucide-react'

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Why Choose ResolveIt?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We've built the most comprehensive complaint resolution platform
            that actually gets results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Easy Filing</h3>
            <p className="text-gray-300 leading-relaxed">
              Submit complaints in minutes with our intuitive interface. Upload
              photos, documents, and provide detailed descriptions effortlessly.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Real-Time Tracking
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Monitor your complaint's progress with live updates. Get notified
              when actions are taken and resolutions are reached.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Guaranteed Results
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Our network of resolution specialists ensures your complaint
              reaches the right people and gets proper attention.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
