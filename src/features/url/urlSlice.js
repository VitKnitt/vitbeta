import { createSlice } from "@reduxjs/toolkit";

const initialState = 'https://www.edgetale.com/'
//'http://localhost:3500/'


const urlSlice = createSlice({
    name: 'urlSlice',
    initialState,
    reducers:{}
})

export const selectUrl = (state) => state.url;

export default urlSlice.reducer;