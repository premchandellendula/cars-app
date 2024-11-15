import React from 'react'

const InputBox = ({label, placeholder, onChange}) => {
  return (
    <div>
        <div className='font-medium text-sm text-left py-2'>
            {label}
        </div>
        <input onChange={onChange} type="text" placeholder={placeholder} className='w-full border rounded border-slate-200 px-2 py-1'/>
    </div>
  )
}

export default InputBox