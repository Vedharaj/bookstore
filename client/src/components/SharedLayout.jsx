import {Outlet} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { createContext } from 'react'

const containerContext = createContext()

const SharedLayout = () => {
  const {isDark} = useSelector((store)=>store.page)
  const {isLoading, isError} = useSelector((store)=>store.books)

  const dispatch = useDispatch()

  const containerStyle = {
    backgroundColor: isDark ? '#121212' : '#fff',
    borderRadius: '10px',
    fontFamily: 'Roboto,  sans-serif'
  }
  return (
    <containerContext.Provider value={{containerStyle, isDark, isLoading, isError, dispatch}}>
      <div className='flex gap-2 w-full relative'>
          <Sidebar />
          <div className='w-full overflow-x-hidden'>
            <Navbar />
            <Outlet />
          </div>
      </div>
    </containerContext.Provider>
  )
}

export {containerContext};
export default SharedLayout