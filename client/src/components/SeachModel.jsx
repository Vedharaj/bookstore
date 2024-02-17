import React from 'react'
import { useSelector } from 'react-redux'
import {FaSearch} from 'react-icons/fa'
import { Modal, Box } from "@mui/material";
import { LuSearch } from "react-icons/lu";

const SeachModel = ({isOpen, modelHandler, value, handleSearch,handleSearchPage, isMenuOpen, SearchItems, setIsMenuOpen}) => {
  const {isDark} = useSelector((store)=>store.page)
  return (
    <Modal
      className='md:hidden'
      open={isOpen}
      onClose={()=>{
        modelHandler(false)
        setIsMenuOpen(false)
      }}
    >
      <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 400,
            bgcolor: isDark ? '#121212' : '#fff',
            color: isDark ? '#fff' : '#000',
            boxShadow: 24,
            p: 1,
            outline: 'none',
            borderRadius: '.2rem',
          }}
        >
          <div className='flex flex-col'>
          <div className='border rounded p-2 text-nowrap'>
              <FaSearch className='inline mr-3 text-sm'/>
              <input
                id='search-input'
                type="text" 
                className='outline-none bg-transparent w-72 text-sm' 
                placeholder='search books here...'
                value={value}
                onChange={(e)=>handleSearch(e)}
                onKeyDown={(e)=>{
                  if(e.key === "Enter"){
                    handleSearchPage()
                  }
                }}
              />
          </div>
          <div 
            style={{top:'3.5rem'}}
            className={`overflow-y-auto h-64 w-full py-2 px-4 ${isMenuOpen?'':'hidden'}`}
          >
            <p className='text-xs text-secondary'>Related search</p>
            <ul className='list-none mt-1'>
              <li className='mt-4 flex cursor-pointer' onClick={handleSearchPage}>
                <LuSearch className='inline mr-3 mt-1'/>
                <p className='mb-2'>{value}</p>
              </li>
              <SearchItems />
            </ul>
          </div>
          </div>
        </Box>
    </Modal>
  )
}

export default SeachModel