import React, { useContext, useEffect, useState } from 'react'
import { containerContext } from '../components/SharedLayout'
import {useSelector} from 'react-redux'
import PageSkeleton from '../components/skeleten/PageSkeleton'
import { fetchLatest } from '../features/books/bookSlice'
import CommonCard from '../components/carts/CommonCard'
import ErrorPage from './others/ErrorPage'
import { CircularProgress } from '@mui/material'


const Latest = () => {
  const {latest, pagination} = useSelector((store)=>store.books)
  const {containerStyle, isLoading, isError, isDark, dispatch} = useContext(containerContext)
  const [isReachEnd, setIsReachEnd] = useState(false)


  useEffect(()=>{
      dispatch(fetchLatest(pagination.latest))
      .then(()=>{
        setIsReachEnd(true)
      })
    },[])

    const handleScroll =(e)=>{
      if(e.target.clientHeight + Math.floor(e.target.scrollTop) >= e.target.scrollHeight-10){
        dispatch(fetchLatest  (pagination.latest))
        }
    }

  return (
    isLoading && !isReachEnd ?
      <PageSkeleton />
    :
    isError ?
      <ErrorPage containerStyle={containerStyle} msg={isError} />
    :
    <div className={`overflow-y-auto h-[80vh] scrollbar-track-transparent scrollbar-thin mt-2 p-4
    ${isDark? 'scrollbar-thumb-white': 'scrollbar-thumb-black'}`} style={containerStyle} onScroll={(e)=>handleScroll(e)}>
        <p className='text-primary md:text-lg text-sm font-bold'>Latest</p>
    <div className="my-3">
      <div className='flex flex-wrap md:gap-4 gap-2 justify-center '>
          {latest.map((i, ind)=><CommonCard key={ind} i={i} />)}
      </div>
      <div className='text-center'>
            {isReachEnd &&
              <CircularProgress size={20} />
            }
          </div>
    </div>
    </div>
  )
}

export default Latest