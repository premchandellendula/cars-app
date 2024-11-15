import React from 'react'
import LandingAppbar from '../components/landing/LandingAppbar'
import LandingCars from '../components/landing/LandingCars'

const Landing = () => {
  return (
    <div>
      <LandingAppbar />
      <div>
        <LandingCars />
      </div>
    </div>
  )
}

export default Landing