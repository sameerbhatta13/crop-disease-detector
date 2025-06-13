import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
    reducerPath: 'authapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:500'
    }),

    endpoints: (builder) => ({
        singupUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            })
        })
    })

})

export const { useSingupUserMutation, useLoginUserMutation } = AuthApi