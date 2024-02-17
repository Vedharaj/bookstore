import React, { useState, useContext, useEffect, useRef } from 'react'
import { FaSearch, FaBars, FaBookmark } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/page/pageSlice";
import SeachModel from './SeachModel';
import { containerContext } from './SharedLayout';
import { Menu, MenuItem } from "@mui/material"
import { LuSearch } from "react-icons/lu";
import { TbCategoryFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchSearchItems, setEmptySearchItems } from '../features/books/bookSlice';

//icons
import { LuSun, LuMoon } from "react-icons/lu";

const Navbar = () => {
  const { containerStyle, isDark, isLoading } = useContext(containerContext)
  const { searchItems } = useSelector((store)=>store.books)

  const [value, setValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchModelOpen, SetIsSearchModelOpen] = useState(false)

  const path = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)


  function handleClickOutside(e){
    if(searchRef.current && !searchRef.current.contains(e.target)){
      setIsMenuOpen(false)
    }
  }

  const dispatch = useDispatch()

  const handleSearchPage = () => {
    if(value.length>3){
      setIsMenuOpen(false)
      SetIsSearchModelOpen(false)
      navigate(`search?q=${value}`)
    }
  }

  //search items
  const handleSearch = (e) => {
    if (value.length >= 2) {
      setIsMenuOpen(true)
      dispatch(fetchSearchItems({q:value, p:0,}))
      // console.log(searchItems)
    } else {
      dispatch(setEmptySearchItems())
      setIsMenuOpen(false)
    }
    setValue(e.target.value)
  }

  function SearchItems() {
    return searchItems.slice(0, 6).map((i, ind) => {
      return (
        <li key={ind} className={`${ind !== 0 && 'mt-4'} flex cursor-pointer`} onClick={()=>{
          setIsMenuOpen(false)
          SetIsSearchModelOpen(false)
          navigate("../book/"+i._id)}
          }
        >
          <img src={i.thumbnail} alt={i.title} className='w-6 h-6 mr-2 rounded-full inline' />
          <p>{i.title}</p>
        </li>
      )
    })
  }
  return (
    <div className='flex justify-between items-center px-3 drop-shadow-sm' style={{ ...containerStyle, height: '80px' }}>
      <Link to='/' className='md:hidden'><h2 className='text-2xl font-bold text-center text-nowrap text-primary'>Book Store</h2></Link>
      <div className='flex flex-col' ref={searchRef}>
        <div className='hidden md:block'>
          <div className='border rounded p-2'>
            <FaSearch className='inline mr-3' />
            <input
              id='search-input'
              type="text"
              className='outline-none bg-transparent w-72'
              placeholder='search books here...'
              value={value}
              onChange={(e) => handleSearch(e)}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  handleSearchPage()
                }
              }}
            />
          </div>
          <div
            style={{ top: '3.5rem' }}
            className={`drop-shadow-md h-48 overflow-y-auto bg-white text-black w-80 py-2 px-4 absolute ${(isMenuOpen && !isLoading) ? '' : 'hidden'}`}
          >
            <p className='text-sm text-secondary'>Related search</p>
            <ul className='list-none mt-1'>
              <li className='mt-4 flex cursor-pointer' onClick={handleSearchPage}>
                <LuSearch className='inline mr-3 mt-1' />
                <p className='mb-2'>{value}</p>
              </li>
              <SearchItems />
            </ul>
          </div>
        </div>
      </div>
      <div className='flex flex-cols gap-3'>
        <FaSearch className='cursor-pointer md:hidden text-md' onClick={() => SetIsSearchModelOpen(true)} />
        {isDark ?
          <LuSun className='cursor-pointer text-md md:text-[1.5rem]' onClick={() => dispatch(toggleTheme())} />
          :
          <LuMoon className='cursor-pointer text-md md:text-[1.5rem]' onClick={() => dispatch(toggleTheme())} />
        }
      </div>
      <SeachModel
        isMenuOpen={isMenuOpen}
        isOpen={isSearchModelOpen}
        modelHandler={SetIsSearchModelOpen}
        value={value}
        handleSearch={handleSearch}
        SearchItems={SearchItems}
        setIsMenuOpen={setIsMenuOpen}
        handleSearchPage={handleSearchPage}
      />
    </div>
  )
}

export default Navbar