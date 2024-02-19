import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import AuthorCard from './carts/AuthorCard'
import CommonCard from './carts/CommonCard'
import GenresCard from './carts/GenresCard'
import { containerContext } from './SharedLayout'
import { useSelector } from 'react-redux'

const Container = ({conStyle, title, page, data}) => {

  const {isDark, containerStyle,} = useContext(containerContext)
  const {related} = useSelector(store=>store.books)

  function Cart(){  
    switch (title){
        case "Top Authors":
            return data.map((i, ind)=><AuthorCard key={ind} i={i}/>)
        case "Genres":
          return data.slice(0, 6).map((i, ind)=><GenresCard key={ind} i={i} />)
        case "Most Popular":
            return data.slice(0, 6).map((i, ind)=><CommonCard key={ind} i={i} />)  
        case "Latest":
            return data.slice(0, 6).map((i, ind)=><CommonCard key={ind} i={i} />)
        case "Related":
            return related.map((i, ind)=><CommonCard key={ind} i={i} />)
    }
  }

  return (
    
    <div className=' rounded py-2 px-4 ' style={{...containerStyle, ...conStyle}}>
        <div className='flex justify-between'>
            <p className='text-primary md:text-xl text-lg font-bold'>{title}</p>
            {page && 
              <Link to={page} className='text-xs md:text-md'>view all</Link>
            }
        </div>
        <div className='mt-2 flex gap-2 md:gap-4 overflow-x-auto md:scrollbar-track-transparent md:scrollbar-thin scrollbar-none'>
          <Cart />
        </div>
    </div>
  )
}

export default Container