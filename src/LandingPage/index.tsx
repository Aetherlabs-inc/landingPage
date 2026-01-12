import React from 'react'
import Story from './Story'
import WaitlistSection from './WaitlistSection'

const LandingPage = () => {
  return (
    <div className='flex flex-col' id="story">
      <Story />
      <WaitlistSection />
    </div>
  )
}

export default LandingPage