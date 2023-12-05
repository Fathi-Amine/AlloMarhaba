import {apiSlice} from "./apiSlice.js";

const USERS_URL = '/api/manager'
const CLIENT_URL = '/api/client'

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
       updateMenu: builder.mutation({
        query:(data)=>({
           url: `${USERS_URL}/updateMenu`,
           method: 'POST',
            body: data
       })
   }),
        deleteMenu: builder.mutation({
            query:(data)=>({
            url: `${USERS_URL}/deleteMenu`,
            method: 'POST',
                body: data
        })


            }),
        showOrders: builder.query({
            query:()=>({
            url: `${USERS_URL}/getOreders`,
            method: 'GET',
        })
        }),

        updateOrderStatus: builder.mutation({
            query:(data)=>({
               url: `${USERS_URL}/changeStatus`,
               method: 'POST',
                body: data
           })
        }),
        getClientOrders: builder.query({
            query:()=>({
            url: `${CLIENT_URL}/getClientOrders`,
            method: 'GET',
        })
        }),
        getRestaurants: builder.query({
            query:()=>({
            url: `${USERS_URL}/getRestaurant`,
            method: 'GET',
        })
        }),

     
        
    })
})





export const {useAddMenuMutation , useShowMenusQuery,useGetRestaurantsQuery,useShowOrdersQuery, useGetClientOrdersQuery,useUpdateOrderStatusMutation, useShowMenuMutation , useUpdateMenuMutation , useDeleteMenuMutation } = menusApiSlice