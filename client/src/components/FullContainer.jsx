import React, {useContext} from 'react'
import { containerContext } from './SharedLayout'
import CommonCard from './carts/CommonCard'
import CartSkeleten from './skeleten/CartSkeleten'
import { CircularProgress } from '@mui/material'
import NothingFound from '../pages/others/NothingFound'

const FullContainer = ({isLoading, authorId, data, isEnd}) => {
  const {containerStyle} = useContext(containerContext)
  return (
    <div className='rounded py-2 h-screen mb-2 px-4 overflow-hidden' style={containerStyle} >
        <h1>{authorId}</h1>
        {isLoading ?
        <CartSkeleten />
        :
        data.length === 0?
        <NothingFound />
        :
        <div>
          <div className='mt-2 flex flex-wrap gap-4'>
            {data.map((i, ind)=><CommonCard key={ind} i={i} />)}
          </div>
          <div className='text-center'>
                {!isEnd &&
                  <CircularProgress size={20} />
                }
          </div>
        </div>}
    </div>
  )
}

export default FullContainer