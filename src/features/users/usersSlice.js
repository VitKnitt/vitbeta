import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    name : "",
    cookie : Cookies.get('token') || ""
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        saveUsersName : (state,action) => {
            state.name = action.payload
        }
    }
})

export const { saveUsersName } = usersSlice.actions;

export default usersSlice.reducer;