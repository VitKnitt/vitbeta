import { createSlice } from "@reduxjs/toolkit";

//const initialState = 'http://localhost:3500/'
const initialState = 'https://vitbeta-api.onrender.com/'


const urlSlice = createSlice({
    name: 'urlSlice',
    initialState,
    reducers:{}
})

export const selectUrl = (state) => state.url;

export default urlSlice.reducer;