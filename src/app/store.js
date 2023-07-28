import { configureStore } from "@reduxjs/toolkit"
import  urlReducer  from '../features/url/urlSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
    reducer:{
        url: urlReducer,
        users: usersReducer
    }
})