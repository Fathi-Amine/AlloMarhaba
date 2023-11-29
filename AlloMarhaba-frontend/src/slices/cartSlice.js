import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalPrice: 0, // Add a new property for total price
};

const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const newItem = {
                ...item,
                quantity: 1,
            };
            state.cartItems.push(newItem);
            state.totalPrice = calculateTotalPrice(state.cartItems);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== itemIdToRemove
            );
            state.totalPrice = calculateTotalPrice(state.cartItems);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        updateCartItems: (state, action) => {
            state.cartItems = action.payload;
            state.totalPrice = calculateTotalPrice(state.cartItems);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, updateCartItems } = cartSlice.actions;

export default cartSlice.reducer;
