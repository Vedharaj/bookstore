import React from 'react'
import { useNavigate } from 'react-router-dom';

const GenresCard = ({i, ind}) => {
  const navigate = useNavigate()
  const handleGenreClick = ()=>{
    navigate('../search/?genres='+i.genre)
  }
  return (
    <div className="cursor-pointer" key={ind} onClick={handleGenreClick}>
      <img src={i.imgurl} alt={i.genre} className='object-cover md:w-[4cm] md:h-[5cm] h-[2.5cm] w-[2cm]'/>
      <p className='md:text-sm text-xs md:w-28 w-16 text-nowrap text-ellipsis overflow-hidden text-center'>{i.genre}</p>
    </div>
  )
}

export default GenresCard