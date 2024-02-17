import React from 'react'
import { Skeleton } from '@mui/material'

const CartSkeleten = ({isDark}) => {
  return (
    <div >
        <Skeleton variant='rectangle' sx={{fontSize:'1rem', width: {md:'7rem', xs:'5rem'}, height: {md:'7rem', xs:'5rem'}, backgroundColor: isDark && '#242526'}} />
        <Skeleton variant='text' sx={{fontSize:'1rem', width: {md: '4rem', xs: '2rem'}, height: {md:'1rem', xs:'.8rem'}, backgroundColor: isDark && '#242526'}} />
        <Skeleton variant='text' sx={{fontSize:'1rem', width: {md: '6rem', xs: '4rem'}, height: {md:'1rem', xs:'.8rem'}, backgroundColor: isDark && '#242526'}} />
    </div>
  )
}

export default CartSkeleten