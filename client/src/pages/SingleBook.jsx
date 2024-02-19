import React, {useState, useContext, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { containerContext } from '../components/SharedLayout'
import { Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Container from "../components/Container"
import { IoIosArrowDown } from "react-icons/io";
import BookPageSkeleton from '../components/skeleten/BookPageSkeleton'
import axios from 'axios';
import { baseURL, fetchRelatedBooks } from '../features/books/bookSlice';
import { Link } from 'react-router-dom';

const SingleBook = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {id} = useParams()
    const {containerStyle, isDark, dispatch} = useContext(containerContext)
    const [book,  setBook] = useState({})
    useEffect(()=>{
      setIsLoading(true)
      axios.get(baseURL+'book/'+id)
      .then((res)=>{
        setBook(res.data.data[0])
        if(res.data.data[0].categories){
          dispatch(fetchRelatedBooks(res.data.data[0].categories[0]))
        } else{
          dispatch(fetchRelatedBooks("Drama"))
        }
        setIsLoading(false)
      })
      .catch(e=>{
        console.log(e)
      })
    }, [id])
  return (
    isLoading ?
      <BookPageSkeleton />
    :
    <div className='mb-2 h-screen overflow-y-auto gap-2 mt-2 md:scrollbar-track-transparent md:scrollbar-thin scrollbar-none'>
      <div className='grid md:grid-flow-col md:grid-cols-auto grid-flow-row  gap-3 w-full md:h-[402px] p-4 ' style={{...containerStyle}}>
        <div className='md:col-span-1 flex flex-col items-center'>
          <img src={book.thumbnail} alt={book.title} className='md:max-w-[280px] md:max-h-[306px] max-w-36 max-h-52 object-fit'/>
          <div className='md:text-center'>
            {
              book.ratingsCount ?
              <Rating
                className=" mt-2"
                value={book.averageRating}
                readOnly
              /> :
              <Rating
                className="mt-2"
                value={0}
                readOnly
              />
            }
          </div>
          </div>
        <div>
          <h4 className=' text-primary md:md:text-lg md:text-sm font-bold'>{book.title}</h4>
          <p className='md:md:text-sm text-xs'><span>by</span> {book.authors}</p>
          <div className='overflow-hidden md:mt-5 mt-2'>
            <p className='md:line-clamp-6 line-clamp-5 md:md:text-sm text-xs'>{book.description}</p>
          </div>
          <div className='flex justify-center md:justify-end gap-2 mt-3 md:mt-12'>
            {book.previewLink &&
              <Button variant='outlined' className='md:md:text-lg text-xs'><a href={book.previewLink} target='_black'>Preview</a></Button>}
            {book.buyLink &&
              <Button variant='outlined' color="error" className='md:md:text-lg text-xs'><a href={book.buyLink} target='_black'>Buy</a></Button>}
            {book.webReaderLink &&
              <Button variant='outlined' color="warning" className='md:md:text-lg text-xs'><a href={book.webReaderLink} target='_black'>Read</a></Button>}
          </div>
        </div>
      </div>
      <Accordion 
      sx={{
          ...containerStyle, 
          boxShadow: 'none',
          marginTop: '.5rem', 
          '&:before': {
            display: 'none',
        },}}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown color={isDark ? 'white': 'black'} fontSize={'1.3rem'} />}
          aria-controls="panel-content"
        >
          <h2 className='md:text-lg font-bold text-primary'>More info</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className='grid md:grid-cols-4 text-center grid-cols-2 gap-4 mb-4 mt-4 md:justify-around'>
            <div>
              <p className='md:text-sm text-xs text-secondary font-normal'>Language</p>
              <p className={`md:text-lg text-sm font-medium ${isDark?'text-white':'text-black'}`}>{book.language}</p>
            </div>
            <div>
              <p className='md:text-sm text-xs text-secondary font-normal'>Publish Date</p>
              <p className={`md:text-lg text-sm font-medium ${isDark?'text-white':'text-black'}`}>{book.publishedDate}</p>
            </div>
            <div>
              <p className='md:text-sm text-xs text-secondary font-normal'>Page Count</p>
              <p className={`md:text-lg text-sm font-medium ${isDark?'text-white':'text-black'}`}>{book.pageCount}</p>
            </div>
            <div>
              <p className='md:text-sm text-xs text-secondary font-normal'>Genres</p>
              <Link to={'../../search?genres='+book.categories}>
                <p className={`md:text-lg text-sm font-medium ${isDark?'text-white':'text-black'}`}>{book.categories || "NaN"}</p>
              </Link>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className='mt-2 md:mb-24 mb-20'>
        <Container title="Related"/>
      </div>
    </div>  
  )
}

export default SingleBook