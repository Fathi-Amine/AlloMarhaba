// orderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderStatus: '', // Initial status
    orderId: '', // Initial order ID
  },
  reducers: {
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { setOrderStatus, setOrderId } = orderSlice.actions;

export const selectOrderStatus = (state) => state.order.orderStatus;
export const selectOrderId = (state) => state.order.orderId;

export default orderSlice.reducer;
