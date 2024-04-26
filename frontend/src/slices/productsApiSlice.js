import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts: builder.query({
            query: ({pageNumber, keyword}) => ({
                url: `${PRODUCT_URL}`,
                params:{pageNumber,keyword},
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            }),
            providesTags:['Products'],
            keepUnusedDataFor: 5
        }),
        getProductDetail: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            }),
            invalidatesTags:['Products']
        }),
        createProduct: builder.mutation({
            query : ()=>({
                url: PRODUCT_URL,
                method:'POST',
                headers:{"Content-Type":"application/json"},
                credentials:"include",

            }),
            invalidatesTags:['Products']
        }),
        updateProduct: builder.mutation({
            query:(data)=>({
                url: `${PRODUCT_URL}/${data._id}`,
                method:'PUT',
                body:data,
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            }),
            invalidatesTags:['Products']
        }),
        uploadProductImage: builder.mutation({
            query: (data)=>({
                url: UPLOAD_URL,
                method:'POST',
                body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId)=>({
                url: `${PRODUCT_URL}/${productId}`,
                method:'DELETE',
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            })
        }),
        createReview: builder.mutation({
            query: (data)=>({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method:'POST',
                body: data,
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            }),
            invalidatesTags:['Product']
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/top`,
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            }),
            keepUnusedDataFor:5
        }),
    }),
})

export const { useGetProductsQuery, useGetProductDetailQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery } = productApiSlice;