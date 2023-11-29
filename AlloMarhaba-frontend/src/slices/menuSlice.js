// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  menus:localStorage.getItem('menuInfo') ? JSON.parse(localStorage.getItem('menuInfo')) : null,

};

// Create a slice
const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.menus = action.payload;
      localStorage.setItem('menuInfo',JSON.stringify(action.payload))
    },
  },
});

// Export actions and reducer
export const { setMenus } = menuSlice.actions;
export default menuSlice.reducer;
