import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name : ""
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