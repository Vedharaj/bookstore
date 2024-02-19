import React, { useContext, useEffect, useState } from 'react'
import { containerContext } from '../components/SharedLayout'
import {useSelector} from 'react-redux'
import CommonCard from '../components/carts/CommonCard'
import { useLocation } from 'react-router-dom';
import PageSkeleton from '../components/skeleten/PageSkeleton';
import NothingFound from './others/NothingFound'
import { fetchSearchItems } from '../features/books/bookSlice';
import { setEmptySearchItems } from '../features/books/bookSlice';
import { CircularProgress } from '@mui/material';

const options = ['Drama', 'Philosophy', 'American fiction', 'Love', 'Mystery', 'Education', 'Psychology', 'Art', 'Romance', 'Fiction', 'Fantasy'];

const Search = () => {
  const {searchItems} = useSelector((store)=>store.books)
  const {containerStyle, dispatch, isLoading, isDark} = useContext(containerContext)
  const location = useLocation()
  const [isReachEnd, setIsReachEnd] = useState(false)
  const [page, setPage] = useState(0)

  const query = new URLSearchParams(location.search)
  const q = query.get('q')
  const genres_query = query.get('genres')
  const [genres, setGenres] = useState(genres_query)

  
  const dispatchSearch = (g)=>{
    if(g && q){
      dispatch(fetchSearchItems({q:q, p:page, g:g}))
    } else if(q && !g){
      dispatch(fetchSearchItems({q:q, p:page}))
    } else if(!q && g){
      dispatch(fetchSearchItems({p:page, g:g}))
    }
  }
  function handleGenresSelect(e) {
    setPage(0)
    dispatch(setEmptySearchItems())
    dispatchSearch(e.target.value)
    setGenres(e.target.value)
  }
  
  useEffect(()=>{
    setPage(0)
    dispatch(setEmptySearchItems())
    dispatchSearch(genres_query)
    setIsReachEnd(true)
  }, [])

  const Options = ()=>{
    return(
      options.map((i, ind)=>(
        <option value={i} key={ind} className='text-black'>{i}</option>
      ))  
    )
  }

  const handleScroll =(e)=>{
    if(e.target.clientHeight + Math.floor(e.target.scrollTop) >= e.target.scrollHeight-10){
      setPage(ps=>ps+1)
      dispatchSearch(genres)
      }
  }

  return (
      <div className='flex flex-col mt-2'>
      <div className='rounded py-2 px-4 mt-2 flex justify-between items-center' style={containerStyle}>
        <div className='md:w-36 w-28 text-ellipsis text-nowrap overflow-hidden'>
          {q ?
            <p className='text-primary text-lg font-bold inline w-2 text-nowrap text-ellipsis overflow-hidden'>{q}</p>
            :
            <p className='text-primary text-lg font-bold inline w-2 text-nowrap text-ellipsis overflow-hidden'>{genres || genres_query}</p>
          }
        </div>
        <select 
          name="genres" 
          id="genres"
          value={genres}
          onChange={(e)=>handleGenresSelect(e)}
          className={`bg-transparent p-1 border rounded-sm w-24 ${isDark?'text-white':'text-black'}`}
        >
          <option value="" disabled>Genres</option>
          <Options />
        </select>
      </div>
      {isLoading && !isReachEnd ?
        <PageSkeleton />
        :
        searchItems.length === 0 ?
          <NothingFound containerStyle={containerStyle} isDark={isDark}/>
        :
          <div className={`overflow-y-auto h-screen scrollbar-track-transparent scrollbar-thin mt-2 p-4
          ${isDark? 'scrollbar-thumb-white': 'scrollbar-thumb-black'}`}  style={containerStyle} onScroll={(e)=>handleScroll(e)}>
          <div className="my-3">
            <div className='flex flex-wrap md:gap-4 gap-2 justify-center'>
              {searchItems.map((i, ind)=><CommonCard key={ind} i={i} />)}
            </div>
            <div className='text-center mt-2 md:mb-36 mb-32'>
              {isReachEnd &&
                <CircularProgress size={20} />
              }
            </div>
          </div>
          </div>}
    </div>
  )
}

export default Search