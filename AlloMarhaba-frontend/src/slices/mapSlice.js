import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lat: null,
    lng: null,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setCoordinates: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },
    },
});

export const { setCoordinates } = mapSlice.actions;

export default mapSlice.reducer;
