import React, { useContext, useEffect, useState } from 'react'
import { containerContext } from '../components/SharedLayout' 
import { useSelector} from 'react-redux'
import GenresCard from '../components/carts/GenresCard'
import PageSkeleton from '../components/skeleten/PageSkeleton'
import { fetchGenres } from '../features/books/bookSlice'
import { CircularProgress } from '@mui/material'
import ErrorPage from './others/ErrorPage'


const Genres = () => {
  const {genres, pagination} = useSelector((store)=>store.books)
  const {containerStyle, isLoading, isError, isDark, dispatch} = useContext(containerContext)
  const [isReachEnd, setIsReachEnd] = useState(false)


  useEffect(()=>{
    dispatch(fetchGenres(pagination.genres))
    .then(()=>{
      setIsReachEnd(true)
    })
  },[])

  const handleScroll =(e)=>{
    if(e.target.clientHeight + Math.floor(e.target.scrollTop) >= e.target.scrollHeight-10 ){
      if(pagination.genres < 3){
        dispatch(fetchGenres(pagination.genres))
      } else{
        setIsReachEnd(false)
      }
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
      <p className='text-primary md:text-lg text-sm font-bold'>Genres</p>
      <div className="my-3">
        <div className='flex flex-wrap md:gap-4 gap-2 justify-center'>
        {genres.map((i, ind)=><GenresCard key={ind} i={i} />)}
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

export default Genres