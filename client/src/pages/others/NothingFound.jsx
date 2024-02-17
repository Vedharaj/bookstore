import React from 'react'
import nothingFound from '../../assets/nothing-found.png'

const NothingFound = ({containerStyle, isDark}) => {
  return (
    <div className='flex h-[70vh] justify-center items-center flex-col mt-2 text-roboto' style={containerStyle}>
    <img src={nothingFound} alt="nothing-found" />
    <h2 className={`text-4xl mt-2 ${isDark? 'text-white': 'text-black' }`}>Oops!</h2>
    <p className='text-secondary text-sm mt-2'>Nothing Found</p>
</div>
  )
}

export default NothingFound