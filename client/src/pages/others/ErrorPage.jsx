import React from 'react'
import noWifi from '../../assets/no-wifi.png'
import { IoReload } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const ErrorPage = ({containerStyle, msg}) => {
  const navigate = useNavigate()
  return (
    <div className='flex md:h-[80vh] h-[85vh] justify-center items-center flex-col mt-2 text-roboto' style={containerStyle}>
        <img src={noWifi} alt="no-wifi" />
        <h2 style={{color: "#EE1122"}} className='font-bold'>{msg}</h2>
        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate(0)}>
          <p className='text-secondary text-sm'>Click to retry</p>
          <IoReload fontSize={".8rem"} className='text-secondary mt-1' />
        </div>
    </div>
  )
}

export default ErrorPage