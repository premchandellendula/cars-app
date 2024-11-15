import React from 'react'
import { useNavigate } from 'react-router-dom'
import FlyoutLink from './utils/FlyoutLink';

const Appbar = ({firstname="User"}) => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-between shadow h-14 px-4'>
        <div onClick={() => {
            navigate('/home')
        }} className='flex flex-col justify-center h-full ml-2 text-2xl font-bold cursor-pointer'>
            Spyne
        </div>
        <div className='flex justify-center gap-4 h-full ml-4 items-center'>
            <button onClick={() => {
                navigate('/mycars')
            }} type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none h-10 rounded-lg font-medium text-md w-20 text-center'>My Cars</button>

            <button onClick={() => {
                navigate('/addcar')
            }} type='button' className='text-white bg-green-600 hover:bg-green-700 focus:outline-none h-10 rounded-lg font-medium text-md w-20 text-center'>Add Car</button>
        
            <div className='rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2 ml-2'>
            <FlyoutLink>
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24" 
                  style={{fill: 'rgba(255, 255, 255)', transform: '', msFilter: ''}}>
                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                </svg>
              </FlyoutLink>
            </div>
      </div>
    </div>
  )
}

export default Appbar