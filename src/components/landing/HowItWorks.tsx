

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-black/20 backdrop-blur-sm"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting your complaints resolved has never been easier. Follow these
            simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white">
              1
            </div>
            <h3 className="text-2xl font-bold text-white">
              File Your Complaint
            </h3>
            <p className="text-gray-300">
              Describe your issue, upload evidence, and select the appropriate
              category. Our smart system will route it correctly.
            </p>
          </div>

          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white">
              2
            </div>
            <h3 className="text-2xl font-bold text-white">We Take Action</h3>
            <p className="text-gray-300">
              Our team contacts the relevant authorities, businesses, or
              organizations on your behalf with all the necessary details.
            </p>
          </div>

          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white">
              3
            </div>
            <h3 className="text-2xl font-bold text-white">Get Results</h3>
            <p className="text-gray-300">
              Receive updates and final resolution. We follow up until your
              complaint is properly addressed and resolved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks