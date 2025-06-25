function Stats() {
  return (
    <section className="py-16 px-6 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">50K+</div>
            <div className="text-gray-400">Complaints Resolved</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">95%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">48hrs</div>
            <div className="text-gray-400">Average Resolution</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">24/7</div>
            <div className="text-gray-400">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
