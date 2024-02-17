import {configureStore} from '@reduxjs/toolkit'

import bookSlice from './features/books/bookSlice'
import pageSlice from './features/page/pageSlice'

export const Store = configureStore({
    reducer:{
        books: bookSlice,
        page: pageSlice
    }
})