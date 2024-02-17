import React, { useContext } from 'react'
import { Skeleton } from '@mui/material'
import { containerContext } from '../SharedLayout'
import CartSkeleten from './CartSkeleten'
const ContainerSkeleten = () => {
  const {isDark, containerStyle} = useContext(containerContext)
  return (
    <div className='md:h-60 h-36 rounded py-2 px-4' style={{...containerStyle, height: '12rem'}}>
        <div className='flex justify-between'>
          <Skeleton variant='text' sx={{fontSize:'1rem', width: '5rem', backgroundColor: isDark && '#242526'}} />
        </div>
        <div className='mt-2 flex gap-4 md:gap-8 overflow-hidden'>
          {Array(11).fill().map((i, ind)=><CartSkeleten key={ind} isDark={isDark} />)}
        </div>
    </div>
  )
}

export default ContainerSkeleten  