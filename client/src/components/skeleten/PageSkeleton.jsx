import React, { useContext } from 'react'
import { containerContext } from '../SharedLayout'
import { Skeleton } from '@mui/material'
import CartSkeleten from './CartSkeleten'

const PageSkeleton = () => {
    const {containerStyle, isDark} = useContext(containerContext)
    return (
      <div className='rounded py-2 px-4 mt-2 overflow-hidden' style={containerStyle}>
            <Skeleton variant='text' sx={{fontSize:{md:'1rem',xs:".8rem"}, width: {md:'5rem',xs:"3rem"}, backgroundColor: isDark && '#242526'}} />
        <div className='mt-2 grid md:grid-cols-6 grid-cols-3 md:gap-x-3 md:gap-y-2 gap-x-10'>
            {Array(11).fill().map((i, ind)=><CartSkeleten key={ind} isDark={isDark} />)}
        </div>
      </div>
    )
}

export default PageSkeleton