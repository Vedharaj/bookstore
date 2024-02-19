import React, { useContext, useEffect, useState } from 'react'
import { TiHome } from "react-icons/ti";
import { TbCategoryFilled } from "react-icons/tb";
import {  FaGrinStars } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { containerContext } from './SharedLayout';

const Sidebar = () => {
  const {containerStyle} = useContext(containerContext)
  const [isBtnClicked, setIsBtnClicked] = useState(null)
  const path = useLocation()

  useEffect(()=>{
    setIsBtnClicked(path.pathname.slice(1))
  },[])
  
  const handleBtnClick = (e)=>{
    setIsBtnClicked(e)  
  }

  return (
    <div className='h-[97vh] w-44 py-3 px-5 drop-shadow-sm hidden md:visible md:flex flex-col justify-between' style={containerStyle}>
      <div>
        <Link to='/'><h2 className='text-2xl font-bold text-center text-nowrap text-primary'>Book Store</h2></Link>
        <div className='mt-5 flex flex-col' >
          <Link 
            to='/' 
            className={`text-sm mb-2 hover:text-gray-400 ${isBtnClicked==='' && 'text-primary font-bold'}`} 
            onClick={()=>handleBtnClick('')}
          >
            <TiHome fontSize={'22px'} className='inline mr-2 mb-1'/>Home
          </Link>
          <Link 
            to='/latest' 
            className={`text-sm mb-2 hover:text-gray-400 ${isBtnClicked==='latest' && 'text-primary font-bold'}`} 
            onClick={()=>handleBtnClick('latest')}
          >
            <FaClockRotateLeft fontSize={'20px'} className='inline mr-2 mb-1'/>Latest
          </Link>
          <Link 
            to='/popular' 
            className={`text-sm mb-2 hover:text-gray-400 ${isBtnClicked==='popular' && 'text-primary font-bold'}`} 
            onClick={()=>handleBtnClick('popular')}
          >
            <FaGrinStars fontSize={'20px'} className='inline mr-2 mb-1'/>Popular
          </Link>
          <Link 
            to='/genres' 
            className={`text-sm mb-2 hover:text-gray-400 ${isBtnClicked==='genres' && 'text-primary font-bold'}`} 
            onClick={()=>handleBtnClick('genres')}
          >
            <TbCategoryFilled fontSize={'20px'} className='inline mr-2 mb-1'/>Genres
          </Link>
        </div>
      </div>
      <div>
        <p className='text-secondary text-sm'>By</p>
        <a href="https://github.com/Vedharaj" target="_blank" rel="noopener noreferrer">
          <p className='text-primary text-sm font-bold'>Vedharaj</p>
        </a>
      </div>
    </div>
  )
}

export default Sidebar