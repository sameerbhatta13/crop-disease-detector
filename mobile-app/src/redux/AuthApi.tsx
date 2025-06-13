import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_URL } from '@env'
export const AuthApi = createApi({
    reducerPath: 'authapi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),

    endpoints: (builder) => ({
        singupUser: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        })
    })

})

export const { useSingupUserMutation, useLoginUserMutation } = AuthApi