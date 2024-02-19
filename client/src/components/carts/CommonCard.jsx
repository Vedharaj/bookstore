import React from 'react'
import { FaStar } from "react-icons/fa";
import { Rating } from "@mui/material";
import no_book from '../../assets/no_book.jpg'
import { useNavigate } from 'react-router-dom';

const CommonCard = ({i}) => {
  const navigate = useNavigate()
  
  const handleBookClick = ()=>{
    navigate('../book/'+i._id)
  }
  return (
    <div className="cursor-pointer" onClick={handleBookClick}>
      {i.thumbnail ?
      <img src={i.thumbnail} alt={i.title} className='object-cover md:w-[4cm] md:h-[5cm] h-[3cm] w-[2.5cm]'/>
      :
      <img src={no_book} alt={i.title} className='object-cover md:w-[4cm] md:h-[5cm] h-[3cm] w-[2.5cm]'/>
      }
      <p className='md:text-lg text-sm md:w-28 w-16 mt-1 text-nowrap text-ellipsis overflow-hidden'>{i.title}</p>
      <div className='flex items-center md:hidden visible'>
        <p className=' text-sm text-secondary'>{`${i.averageRating?i.averageRating:0}(${i.ratingCount?i.ratingCount:0})`}</p>
        <FaStar color='#F6E017'  className='ml-1 text-sm md:text-[1rem]'/>
      </div>
      <div className='hidden md:block'>
        <div className='flex'>
        <Rating value={i.averageRating?i.averageRating:0} readOnly size="small" />
        <p className='text-sm text-secondary inline'>{`(${i.ratingCount?i.ratingCount:0})`}</p>
      </div>
      </div>
    </div>
  )
}

export default CommonCard