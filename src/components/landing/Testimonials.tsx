import { Star } from "lucide-react"


function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real people, real results. See how ResolveIt has helped thousands
            get their issues resolved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-300 mb-6">
              "ResolveIt helped me get a refund from a company that was ignoring
              my emails for months. Within 3 days, I had my money back!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">SM</span>
              </div>
              <div>
                <div className="text-white font-semibold">Sarah Martinez</div>
                <div className="text-gray-400">Small Business Owner</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-300 mb-6">
              "Amazing service! They helped resolve a neighborhood noise issue
              that the local authorities weren't taking seriously."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">MJ</span>
              </div>
              <div>
                <div className="text-white font-semibold">Michael Johnson</div>
                <div className="text-gray-400">Homeowner</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-300 mb-6">
              "Professional, fast, and effective. ResolveIt got my insurance
              claim processed after months of back-and-forth."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">EA</span>
              </div>
              <div>
                <div className="text-white font-semibold">Emily Adams</div>
                <div className="text-gray-400">Teacher</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials