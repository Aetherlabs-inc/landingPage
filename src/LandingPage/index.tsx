import React from 'react'
import Hero from './Hero'
import Features from './Features'
import AboutConcept from './AboutConcept'
import HowItWorks from './HowItWorks'
// import Testimonials from './Testimonials'
// import FinalCTA from './FinalCTA'
import Pricing from './Pricing'
import FAQ from './FAQ'
import UseCases from './UseCases'
import Community from './Community'



const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <Hero />
      <AboutConcept />
      <HowItWorks />
      <Community />
      <Features />
      {/* <Testimonials /> */}
      <UseCases />
      <Pricing />
      <FAQ />
      {/* <FinalCTA /> */}

    </div>
  )
}

export default LandingPage