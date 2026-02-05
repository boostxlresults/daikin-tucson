import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Daikin Tucson - HVAC Services | Phase 0 Setup Complete</title>
        <meta name="description" content="Daikin Tucson HVAC website - Professional heating and cooling solutions for Tucson, Arizona" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-b from-daikin-lightBlue to-white">
        <div className="container-daikin section-daikin">
          <div className="text-center space-y-8">
            <h1 className="text-balance">
              Daikin Tucson HVAC Solutions
            </h1>
            
            <p className="text-xl text-daikin-mediumGray max-w-3xl mx-auto">
              Phase 0 Foundation Complete - Next.js 14 with Pages Router, TypeScript, and Tailwind CSS
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="btn-primary">
                Get Started
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
            
            <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-daikin shadow-md">
                <h3 className="mb-4">Professional Service</h3>
                <p className="text-daikin-mediumGray">
                  Expert HVAC installation and maintenance for Tucson homes and businesses.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-daikin shadow-md">
                <h3 className="mb-4">Energy Efficient</h3>
                <p className="text-daikin-mediumGray">
                  Daikin systems designed for Arizona&rsquo;s climate and maximum efficiency.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-daikin shadow-md">
                <h3 className="mb-4">Local Experts</h3>
                <p className="text-daikin-mediumGray">
                  Tucson-based team with decades of experience in desert climate HVAC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
