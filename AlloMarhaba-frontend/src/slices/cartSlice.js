import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // add quantity to item
            const item = action.payload;
            const newItem = {
                ...item,
                quantity: 1,
            };
            console.log(newItem);
            state.cartItems.push(newItem);
            // get items from local storage and new item

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== itemIdToRemove
            );
            // remove from local storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        updateCartItems: (state, action) => {
            state.cartItems = action.payload;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, updateCartItems } = cartSlice.actions;

export default cartSlice.reducer;
