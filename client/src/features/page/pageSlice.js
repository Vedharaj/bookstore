import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: true
}

const pageSilce = createSlice({
    name: 'page',
    initialState,
    reducers: {
        toggleTheme: (state)=>{
            state.isDark = !state.isDark
        },
    }
})

export const {toggleTheme, offLoading, onLoading} = pageSilce.actions
export default pageSilce.reducer