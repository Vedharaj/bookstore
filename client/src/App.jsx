import React, { createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'

//components
import SharedLayout from './components/SharedLayout';

//pages
import Popular from './pages/popular'
import Home from './pages/home';
import Genres from './pages/Genres'
import Search from './pages/Search'
import Latest from './pages/Latest';
import SingleBook from "./pages/SingleBook";


const App = () => {

  const {isDark} = useSelector((store)=>store.page)

  const pageStyle = {
    backgroundColor: isDark ? '#424242' : '#eee',
    color: isDark ? "#fff" : '#000'
  }
  return (
    <div style={pageStyle} className='h-screen md:p-2 p-1 text-roboto overflow-hidden  md:scrollbar-track-transparent md:scrollbar-thin scrollbar-none'>
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path='popular' element={<Popular />} />
          <Route path='latest' element={<Latest />} />
          <Route path='genres' element={<Genres />} />
          <Route path='search' element={<Search />} />
          <Route path='book/:id' element={<SingleBook />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App