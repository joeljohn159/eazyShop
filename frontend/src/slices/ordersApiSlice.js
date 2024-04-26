import { apiSlice } from "./apiSlice";
import {ORDERS_URL} from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createOrder : builder.mutation({
            query: (order)=>({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId)=>({
                url:`${ORDERS_URL}/${orderId}`,
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            }),
            keepUnusedDataFor:5
        }),
        payOrder: builder.mutation({
            query: ({orderId, details})=>({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method:'PUT',
                body:{...details},
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
            })
        }),
        getMyOrders: builder.query({
            query: ()=>({
                url: `${ORDERS_URL}/mine`,
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
            }),
            keepUnusedDataFor:5
        }),
        getOrders: builder.query({
            query: ()=> ({
                url: `${ORDERS_URL}`,
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
            }),
            keepUnusedDataFor:5
        }),
        deliverOrder: builder.mutation({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
            })
        })
    })
})


export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetMyOrdersQuery,
                useGetOrdersQuery, useDeliverOrderMutation} = ordersApiSlice;