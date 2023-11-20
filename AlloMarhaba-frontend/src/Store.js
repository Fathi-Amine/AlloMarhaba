import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice.js"
import {apiSlice} from "./slices/apiSlice.js";
import menuReducer from "./slices/menuSlice.js"

const store = configureStore({
    reducer:{
        auth: authReducer,
        menus: menuReducer, // Add this line
        [apiSlice.reducerPath]:apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store