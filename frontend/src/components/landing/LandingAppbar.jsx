import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingAppbar = ({firstname}) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center shadow h-16'>
        <div className='flex flex-col justify-center h-full ml-2 text-2xl font-bold'>
            Spyne
        </div>
        <div className='flex justify-center items-center'>
            <button onClick={() => {
              navigate('/signin')
            }} type='button' className='w-full text-gray-800 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4'>Signin</button>
            <button onClick={() => {
              navigate('/signup')
            }} type='button' className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4'>Signup</button>
        </div>
    </div>
  )
}

export default LandingAppbar