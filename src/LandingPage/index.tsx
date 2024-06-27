import React from 'react'
import Hero from './Hero'
import Features from './Features'

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <Hero />
      <Features />
    </div>
  )
}

export default LandingPage