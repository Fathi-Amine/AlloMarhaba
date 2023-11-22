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
        showMenus: builder.query({
             query:()=>({
                url: `${USERS_URL}/showMenus`,
                method: 'GET',
            })
        }),
        showMenu: builder.mutation({
            query:(data)=>({
               url: `${USERS_URL}/showMenu`,
               method: 'POST',
                body: data
           })
       }),
     
        
    })
})





export const {useAddMenuMutation , useShowMenusQuery , useShowMenuMutation } = menusApiSlice