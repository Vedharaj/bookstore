import React, { createContext, useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import FullContainer from '../components/FullContainer'
import { containerContext } from '../components/SharedLayout'
import ContainerSkeleten from '../components/skeleten/ContainerSkeleten'
import ErrorPage from './others/ErrorPage'
import { useSelector } from 'react-redux'
import { fetchPopular, fetchLatest, fetchGenres, fetchAuthors, baseURL, setError } from '../features/books/bookSlice.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const authorContainer = createContext()

const Home = () => {
  const navigate = useNavigate()
  const {isDark, isLoading, isError, dispatch} = useContext(containerContext)
  const [authorId, setAuthorId] = useState(null)
  const [authorBooks, setAuthorBooks] = useState([])
  const {popular, authors, genres, latest, pagination} = useSelector((store)=>store.books)
  const [page, setPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(()=>{
    dispatch(fetchPopular(pagination.popular))
    dispatch(fetchLatest(pagination.latest))
    dispatch(fetchGenres(pagination.genres))
    dispatch(fetchAuthors())
    },[])

  const handleAuthorId = (i, page)=>{
    setPage(ps=>ps+1)
    axios.get(baseURL+"books?limit=18"+"&page="+page+"&authors="+i)
    .then((response)=>{
      const length = response.data.data.length
      if(length >= 18 ||  length !== 0){
        setIsEnd(true)
        setAuthorBooks(ps=>([...ps, ...response.data.data]))
        setAuthorId(i)
        
      } else{
        setIsEnd(true)
      }
    })
    .catch((error)=>{
        setIsLoadingCurr(false)
        console.log(error.message)
    })
  }

  const handleScroll =(e)=>{
    if(e.target.clientHeight + Math.floor(e.target.scrollTop) >= e.target.scrollHeight-10){
      handleAuthorId(authorId, page)
      }
  }


  return (
    <div style={{zIndex: '10px',}} className={`overflow-y-auto h-[16.5cm] scrollbar-track-transparent scrollbar-thin mt-2
      ${isDark? 'scrollbar-thumb-white': 'scrollbar-thumb-black'}`} onScroll={(e)=>handleScroll(e)}>
      {isLoading ?
      isError ?
      <ErrorPage containerStyle={containerStyle} msg={isError} />
      :
        <div className='flex flex-col gap-2'>
          <ContainerSkeleten />
          <ContainerSkeleten />
        </div>
      :
      <authorContainer.Provider value={{authorId, handleAuthorId, setPage, setAuthorBooks, setAuthorId}}>
        <div className='flex flex-col gap-2 md:mb-16 mb-10'>
            <Container key={1} title="Top Authors" page={null} conStyle={{height: '9.5rem'}} data={authors}/>
          { authorId ?
          <div className='mb-20'>
            <div>
            <FullContainer authorId={authorId} isLoading={isLoading} data={authorBooks} isEnd={isEnd} handleAuthorId={handleAuthorId}/>
            </div>
          </div>
          :
          <>
            <Container key={2} title="Most Popular" page="popular" data={popular}/>
            <Container key={3} title="Latest" page="latest" data={latest}/>
            <Container key={4} title="Genres" page="genres" data={genres}/>
          </>
          }
        </div>  
      </authorContainer.Provider>}
    </div>
  )
}

export {authorContainer}
export default Home