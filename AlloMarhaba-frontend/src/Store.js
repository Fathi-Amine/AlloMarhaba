import menuReducer from "./slices/menuSlice.js"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
import mapSlice from "./slices/mapSlice.js";
import cartSlice from "./slices/cartSlice.js";
import orderReducer from "./slices/orderSlice.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        menus: menuReducer, // Add this line
        [apiSlice.reducerPath]:apiSlice.reducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
        map: mapSlice,
        cart: cartSlice,
        order: orderReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
