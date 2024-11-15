import React from 'react'
import Appbar from '../../components/Appbar'
import Cars from '../../components/cars/Cars'

const Home = () => {
  return (
    <div>
        <Appbar />

        <div>
            <Cars />
        </div>
    </div>
  )
}

export default Home