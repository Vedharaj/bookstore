import React, { useContext } from 'react'
import profile from "../../assets/emty-profile.png";
import { authorContainer } from '../../pages/Home.jsx';

const AuthorCard = ({i}) => {
  const {authorId, handleAuthorId, setPage, setAuthorBooks, setAuthorId} = useContext(authorContainer)
  const handleAuthorClick = ()=>{
    if(authorId === i){
      setAuthorId(null)
    } else{
      setPage(0)
      setAuthorBooks([])
      handleAuthorId(i, 0)
    }
  }
  return (  
    <div 
      onClick={handleAuthorClick} 
      className={`md:w-37 w-24 h-24 p-1 rounded-sm flex flex-col items-center cursor-pointer`} 
      style={{backgroundColor: authorId===i?'rgba(243, 91, 4, .9)':'rgba(194, 194, 194, .25)'}} 
    >
      <img src={profile} alt="i.author" className='md:w-16 md:h-16 w-[4rem] h-[4rem]' />
      <p className='text-center w-20 text-xs text-nowrap text-ellipsis overflow-hidden'>{i}</p>
    </div>
  )
}
  
export default AuthorCard