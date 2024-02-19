import React, { useContext, useEffect, useRef, useState } from 'react'
import { containerContext } from '../components/SharedLayout'
import {useSelector} from 'react-redux'
import CommonCard from '../components/carts/CommonCard'
import PageSkeleton from '../components/skeleten/PageSkeleton'
import { fetchPopular } from '../features/books/bookSlice'
import ErrorPage from './others/ErrorPage'
import { CircularProgress } from '@mui/material';

const Popular = () => {
  const {popular, pagination} = useSelector((store)=>store.books)
  const {containerStyle, isLoading, isDark, isError, dispatch} = useContext(containerContext)
  const [isReachEnd, setIsReachEnd] = useState(false)

  useEffect(()=>{
    dispatch(fetchPopular(pagination.popular))
    .then(()=>{
      setIsReachEnd(true)
    })
    },[dispatch])

  const handleScroll =(e)=>{
    if(e.target.clientHeight + Math.floor(e.target.scrollTop) >= e.target.scrollHeight-10){
      dispatch(fetchPopular(pagination.popular))
      }
  }

  return (
    isLoading && !isReachEnd ?
      <PageSkeleton />
    :
    isError ?
      <ErrorPage containerStyle={containerStyle} msg={isError} />
    :
    <div className={`overflow-y-auto h-screen scrollbar-track-transparent scrollbar-thin mt-2 p-4
    ${isDark? 'scrollbar-thumb-white': 'scrollbar-thumb-black'}`}  style={containerStyle} onScroll={(e)=>handleScroll(e)}>
          <p className='text-primary md:text-lg text-sm font-bold'>Popular</p>
        <div className="my-3">
          <div className='flex flex-wrap md:gap-4 gap-2 justify-center'>
              {popular.map((i, ind)=><CommonCard key={ind} i={i} />)}
          </div>
          <div className='text-center md:mb-24 mb-20'>
            {isReachEnd &&
              <CircularProgress size={20} />
            }
          </div>
        </div>
    </div>
  )
}

export default Popular