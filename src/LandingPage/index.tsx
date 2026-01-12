import React from 'react'
import Hero from './Hero'
import Problem from './Problem'
import Solution from './Solution/index'
import Vision from './Vision/index'
import Pricing from './Pricing'
import FAQ from './FAQ'

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <Hero />
      <Problem />
      <Solution />
      <Vision />
      <Pricing />
      <FAQ />
    </div>
  )
}

export default LandingPage