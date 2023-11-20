import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
import mapSlice from "./slices/mapSlice.js";
import cartSlice from "./slices/cartSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        map: mapSlice,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
