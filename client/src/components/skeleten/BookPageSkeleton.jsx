import React, { useContext } from 'react'
import { Skeleton } from '@mui/material'
import { containerContext } from '../SharedLayout'

const BookPageSkeleton = () => {
    const {containerStyle, isDark} = useContext(containerContext)
  return (
    <div className='grid md:grid-cols-9 md:grid-flow-col grid-flow-row mt-2 h-screen p-4 w-full' style={{...containerStyle}}>
        <div className='flex flex-col  items-center md:col-span-2 '>
              <Skeleton variant="rectangular" sx={{fontSize:{md:'13rem',sm:"9rem", xs: "8rem"}, width: {md:'11rem',sm:"9rem", xs: 2/4}, backgroundColor: isDark && '#242526'}}  />
              <div className='text-center mt-2'>
                <Skeleton variant="rectangular" animation={false} sx={{width: "8rem", height: "1rem", backgroundColor: isDark && '#242526'}}  />
            </div>
        </div>
        <div className="md:col-span-7  ml-6">
            <Skeleton variant='text' animation="wave" sx={{fontSize:'1rem', width: {md: '16rem', sm: '10rem',xs: '9rem'}, height: {md:'1.6rem', sm:'1.5rem', xs:".8rem"}, backgroundColor: isDark && '#242526'}} />
            <Skeleton variant='text' animation="wave" sx={{fontSize:'1rem', width: {md: '8rem', sm: '4rem', xs: '4rem'}, height: {md:'.8rem', sm:'1rem', xs: ".6rem"}, backgroundColor: isDark && '#242526'}} />
            <Skeleton variant='text' animation="wave" sx={{fontSize:'1rem', width: 1, height: "40%", backgroundColor: isDark && '#242526'}} />
        </div>
    </div>
  )
}

export default BookPageSkeleton