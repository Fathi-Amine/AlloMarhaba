import {apiSlice} from "./apiSlice.js";

const USERS_URL = '/api/manager'

export const menusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addMenu: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/addMenu`,
                method: 'POST',
                body: data
            })
        }),
     
        
    })
})





export const {useAddMenuMutation } = menusApiSlice