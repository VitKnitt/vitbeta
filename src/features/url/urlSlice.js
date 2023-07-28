import { createSlice } from "@reduxjs/toolkit";

const initialState = 'https://www.edgetale.com/'
//'https://vitbeta.onrender.com/'
//'http://localhost:3500/'
//'https://www.edgetale.com/'


const urlSlice = createSlice({
    name: 'urlSlice',
    initialState,
    reducers:{}
})

export const selectUrl = (state) => state.url;

export default urlSlice.reducer;