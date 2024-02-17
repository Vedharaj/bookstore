import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const baseURL = "http://localhost:5000/bookstore/v1/"

const initialState = {
    isError: null,
    isLoading: false,
    popular:[],
    latest:[],
    related:[],
    authors:[],
    genres: [],
    saved:[],
    searchItems: [],
    pagination: {
        popular: 0,
        latest: 0,
        genres: 0,
    }
}

export const fetchRelatedBooks = createAsyncThunk("book/related", async(g)=>{
        const response = await axios.get(baseURL+"search?genres="+g+"&limit=8")
                return response.data
})

export const fetchSearchItems = createAsyncThunk('books/search', async(params)=>{
        const {q, p, g} = params 
        if(g && q){
                const response = await axios.get(baseURL+"search?q="+q+"&genres="+g+"&limit=18&page="+p)
                return response.data
        }else if(g && !q) {
                const response = await axios.get(baseURL+"search?genres="+g+"&limit=18&page="+p)
                return response.data
        } else{
                const response = await axios.get(baseURL+"search?q="+q+"&limit=18&page="+p)
                return response.data
        }
})

export const fetchPopular = createAsyncThunk('books/popular', async(p)=>{
        const response = await axios.get(baseURL+"popular?limit=18&page="+p)
        return response.data
})

export const fetchLatest = createAsyncThunk('books/latest', async(p)=>{
        const response = await axios.get(baseURL+"latest?limit=18&page="+p)
        return response.data
})

export const fetchGenres = createAsyncThunk('books/genres', async(p)=>{
        const response = await axios.get(baseURL+"genres?limit=12&page="+p)
        return response.data
})

export const fetchAuthors = createAsyncThunk('books/authors', async()=>{
        const response = await axios.get(baseURL+"authors")
        return response.data
})

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setError: (state, action)=>{
                console.log(state.isError)
                state.isError = action.payload
        },
        setEmptySearchItems: (state)=>{
                state.searchItems = []
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchRelatedBooks.fulfilled, (state, action)=>{
                state.related = action.payload.data
        })
        builder
        .addCase(fetchSearchItems.pending, (state)=>{
                state.isLoading = true
        })
        .addCase(fetchSearchItems.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = action.error.message
        })
        .addCase(fetchSearchItems.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = false
                state.searchItems = [...state.searchItems, ...action.payload.data]
        })
        builder
        .addCase(fetchPopular.pending, (state)=>{
                state.isLoading = true
        })
        .addCase(fetchPopular.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = action.error.message
        })
        .addCase(fetchPopular.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = false
                // console.log(state.isError)
                // console.log(action.payload.data)
                state.pagination.popular+=1
                state.popular = [...state.popular, ...action.payload.data]
        })
        builder
        .addCase(fetchLatest.pending, (state)=>{
                state.isLoading = true
        })
        .addCase(fetchLatest.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = action.error.message
        })
        .addCase(fetchLatest.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = null
                // console.log(action.payload.data)
                state.pagination.latest+=1
                state.latest = [...state.latest, ...action.payload.data]
        })
        builder
        .addCase(fetchGenres.pending, (state)=>{
                state.isLoading = true
        })
        .addCase(fetchGenres.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = action.error.message
        })
        .addCase(fetchGenres.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = null
                if(action.payload.data.length !== 0){
                        state.pagination.genres+=1
                        state.genres = [...state.genres, ...action.payload.data]
                }
        })
        builder
        .addCase(fetchAuthors.pending, (state)=>{
                state.isLoading = true
        })
        .addCase(fetchAuthors.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = action.error.message
        })
        .addCase(fetchAuthors.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = null
                // console.log(action.payload.data)
                state.authors = action.payload.data
        })
    }
})

export const {setError, setEmptySearchItems} = bookSlice.actions
export default bookSlice.reducer
